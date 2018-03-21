import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Sub, Person } from "../models"
import * as fromAppRouter from "@sonder-workspace/router";

export interface SubsState {
  readonly subs: Subs;
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
  entities: { [subId: number]: SubApplicantsState }
}
export interface SubApplicantsState {
  entities: { [personId: number]: Person };
  loaded: boolean;
  loading: boolean;
}

export const getAllSubs = createSelector(createFeatureSelector<SubsState>("subs"), state => state);

export const getSuggestedSubs = createSelector(getAllSubs, (subs: any) => subs.suggested);
export const getSuggestedSubsLoaded = createSelector(getSuggestedSubs, suggestedSubs => suggestedSubs.loaded);
export const getSuggestedSubsEntities = createSelector(getSuggestedSubs, (suggestedSubs: any) => {
  return Object.keys(suggestedSubs.entities).map(id => suggestedSubs.entities[parseInt(id, 10)]);
})

export const getAcceptedSubs = createSelector(getAllSubs, (subs: any) => subs.accepted);
export const getAcceptedSubsLoaded = createSelector(getAcceptedSubs, acceptedSubs => acceptedSubs.loaded);
export const getAcceptedSubsEntities = createSelector(getAcceptedSubs, (acceptedSubs: any) => {
  return Object.keys(acceptedSubs.entities).map(id => acceptedSubs.entities[parseInt(id, 10)]);
})

export const getSelectedAcceptedSub = createSelector(
  getAcceptedSubs,
  fromAppRouter.getRouterState,
  (subs, router) => {
    return router.state && subs.entities[router.state.params.subId];
  }
)

export const getApplicants = createSelector(getAllSubs, (subs: any) => subs.applicants);

export const getSubApplicants = createSelector(
  getApplicants,
  fromAppRouter.getRouterState,
  (applicants, router) => {
    return router.state && applicants.entities[router.state.params.subId];
  }
)

export const getSubApplicantsEntities = createSelector(
  getSubApplicants,
  (applicants: any) => Object.keys(applicants.entities).map(id => applicants.entities[parseInt(id, 10)])
)

export const getSubApplicantsLoaded = createSelector(
  getSubApplicants, (applicants) => applicants === undefined ? false : applicants.loaded
)

export const getSubApplicantsBySubId = (subId) => {
  return createSelector(getApplicants, (applicants) => applicants.entities[subId])
}

export const getSubApplicantsLoadedBySubId = (subId) => {
  return createSelector(
    getSubApplicantsBySubId(subId),
    (applicants) => applicants === undefined ? false : applicants.loaded)
}
