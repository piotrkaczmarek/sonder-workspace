import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Party, Person } from "../models"
import * as fromAppRouter from "@sonder-workspace/router";

export interface PartiesState {
  readonly parties: Parties;
}
export interface SuggestedPartiesState {
  entities: { [id: number]: Party };
  loaded: boolean;
  loading: boolean;
}
export interface AcceptedPartiesState {
  entities: { [id: number]: Party };
  loaded: boolean;
  loading: boolean;
}
export interface Parties {
  suggested: SuggestedPartiesState;
  accepted: AcceptedPartiesState;
  applicants: ApplicantsState;
}
export interface ApplicantsState {
  entities: { [partyId: number]: PartyApplicantsState }
}
export interface PartyApplicantsState {
  entities: { [personId: number]: Person };
  loaded: boolean;
  loading: boolean;
}

export const getAllParties = createSelector(createFeatureSelector<PartiesState>("parties"), state => state);

export const getSuggestedParties = createSelector(getAllParties, (parties: any) => parties.suggested);
export const getSuggestedPartiesLoaded = createSelector(getSuggestedParties, suggestedParties => suggestedParties.loaded);
export const getSuggestedPartiesEntities = createSelector(getSuggestedParties, (suggestedParties: any) => {
  return Object.keys(suggestedParties.entities).map(id => suggestedParties.entities[parseInt(id, 10)]);
})

export const getAcceptedParties = createSelector(getAllParties, (parties: any) => parties.accepted);
export const getAcceptedPartiesLoaded = createSelector(getAcceptedParties, acceptedParties => acceptedParties.loaded);
export const getAcceptedPartiesEntities = createSelector(getAcceptedParties, (acceptedParties: any) => {
  return Object.keys(acceptedParties.entities).map(id => acceptedParties.entities[parseInt(id, 10)]);
})

export const getSelectedAcceptedParty = createSelector(
  getAcceptedParties,
  fromAppRouter.getRouterState,
  (parties, router) => {
    return router.state && parties.entities[router.state.params.partyId];
  }
)

export const getApplicants = createSelector(getAllParties, (parties: any) => parties.applicants);

export const getPartyApplicants = createSelector(
  getApplicants,
  fromAppRouter.getRouterState,
  (applicants, router) => {
    return router.state && applicants.entities[router.state.params.partyId];
  }
)

export const getPartyApplicantsEntities = createSelector(
  getPartyApplicants,
  (applicants: any) => Object.keys(applicants.entities).map(id => applicants.entities[parseInt(id, 10)])
)

export const getPartyApplicantsLoaded = createSelector(
  getPartyApplicants, (applicants) => applicants === undefined ? false : applicants.loaded
)

export const getPartyApplicantsByPartyId = (partyId) => {
  return createSelector(getApplicants, (applicants) => applicants.entities[partyId])
}

export const getPartyApplicantsLoadedByPartyId = (partyId) => {
  return createSelector(
    getPartyApplicantsByPartyId(partyId),
    (applicants) => applicants === undefined ? false : applicants.loaded)
}
