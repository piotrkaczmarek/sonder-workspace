import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Sub, Person } from "../models"
import * as fromAppRouter from "@sonder-workspace/router";

export interface SubsState {
  readonly parties: Subs;
}
export interface SuggestedSubsState {
  entities: { [id: number]: Sub };
  loaded: boolean;
  loading: boolean;
}
export interface AcceptedSubsState {
  entities: { [id: number]: Sub };
  loaded: boolean;
  loading: boolean;
}
export interface Subs {
  suggested: SuggestedSubsState;
  accepted: AcceptedSubsState;
  applicants: ApplicantsState;
}
export interface ApplicantsState {
  entities: { [partyId: number]: SubApplicantsState }
}
export interface SubApplicantsState {
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

export const getSelectedAcceptedSub = createSelector(
  getAcceptedSubs,
  fromAppRouter.getRouterState,
  (parties, router) => {
    return router.state && parties.entities[router.state.params.partyId];
  }
)

export const getApplicants = createSelector(getAllSubs, (parties: any) => parties.applicants);

export const getSubApplicants = createSelector(
  getApplicants,
  fromAppRouter.getRouterState,
  (applicants, router) => {
    return router.state && applicants.entities[router.state.params.partyId];
  }
)

export const getSubApplicantsEntities = createSelector(
  getSubApplicants,
  (applicants: any) => Object.keys(applicants.entities).map(id => applicants.entities[parseInt(id, 10)])
)

export const getSubApplicantsLoaded = createSelector(
  getSubApplicants, (applicants) => applicants === undefined ? false : applicants.loaded
)

export const getSubApplicantsBySubId = (partyId) => {
  return createSelector(getApplicants, (applicants) => applicants.entities[partyId])
}

export const getSubApplicantsLoadedBySubId = (partyId) => {
  return createSelector(
    getSubApplicantsBySubId(partyId),
    (applicants) => applicants === undefined ? false : applicants.loaded)
}
