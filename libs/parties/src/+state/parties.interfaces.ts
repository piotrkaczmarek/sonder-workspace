import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Party, Person } from "../models"
import * as fromAppRouter from "@sonder-workspace/router";

export interface SubsState {
  readonly parties: Subs;
}
export interface SuggestedSubsState {
  entities: { [id: number]: Party };
  loaded: boolean;
  loading: boolean;
}
export interface AcceptedSubsState {
  entities: { [id: number]: Party };
  loaded: boolean;
  loading: boolean;
}
export interface Subs {
  suggested: SuggestedSubsState;
  accepted: AcceptedSubsState;
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

export const getAllSubs = createSelector(createFeatureSelector<SubsState>("parties"), state => state);

export const getSuggestedSubs = createSelector(getAllSubs, (parties: any) => parties.suggested);
export const getSuggestedSubsLoaded = createSelector(getSuggestedSubs, suggestedSubs => suggestedSubs.loaded);
export const getSuggestedSubsEntities = createSelector(getSuggestedSubs, (suggestedSubs: any) => {
  return Object.keys(suggestedSubs.entities).map(id => suggestedSubs.entities[parseInt(id, 10)]);
})

export const getAcceptedSubs = createSelector(getAllSubs, (parties: any) => parties.accepted);
export const getAcceptedSubsLoaded = createSelector(getAcceptedSubs, acceptedSubs => acceptedSubs.loaded);
export const getAcceptedSubsEntities = createSelector(getAcceptedSubs, (acceptedSubs: any) => {
  return Object.keys(acceptedSubs.entities).map(id => acceptedSubs.entities[parseInt(id, 10)]);
})

export const getSelectedAcceptedParty = createSelector(
  getAcceptedSubs,
  fromAppRouter.getRouterState,
  (parties, router) => {
    return router.state && parties.entities[router.state.params.partyId];
  }
)

export const getApplicants = createSelector(getAllSubs, (parties: any) => parties.applicants);

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
