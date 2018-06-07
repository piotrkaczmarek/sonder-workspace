import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromAppRouter from "@sonder-workspace/router";
import { Group, Person } from "../models"

export interface GroupsState {
  readonly groups: Groups;
  readonly acceptedGroups: AcceptedGroupsState;
  readonly suggestedGroups: SuggestedGroupsState;
  readonly groupApplicants: ApplicantsState;
}
export interface Groups {
  entities: { [id: number]: Group };
}
export interface SuggestedGroupsState {
  entities: Array<number>;
  loaded: boolean;
  loading: boolean;
}
export interface AcceptedGroupsState {
  entities: Array<number>;
  loaded: boolean;
  loading: boolean;
}
export interface ApplicantsState {
  entities: { [groupId: number]: GroupApplicantsState }
}
export interface GroupApplicantsState {
  entities: { [personId: number]: Person };
  loaded: boolean;
  loading: boolean;
}

export const getGroupsState = createSelector(createFeatureSelector<GroupsState>("groups"), state => state);

export const getGroups = createSelector(getGroupsState, (groupsState: GroupsState) => {
  return groupsState.groups;
});

export const getSuggestedGroups = createSelector(getGroupsState, (groups: any) => groups.suggestedGroups);
export const getSuggestedGroupsLoaded = createSelector(getSuggestedGroups, suggestedGroups => suggestedGroups.loaded);
export const getSuggestedGroupsEntities = createSelector(
  getGroups,
  getSuggestedGroups,
  (groups: Groups, suggestedGroups: SuggestedGroupsState) => {
    if (suggestedGroups) {
      return suggestedGroups.entities.map(id => groups.entities[id]);
    }
});

export const getAcceptedGroups = createSelector(getGroupsState, (groups: any) => groups.acceptedGroups);
export const getAcceptedGroupsLoaded = createSelector(getAcceptedGroups, acceptedGroups => acceptedGroups.loaded);
export const getAcceptedGroupsEntities = createSelector(
  getGroups,
  getAcceptedGroups,
  (groups: Groups, acceptedGroups: AcceptedGroupsState) => {
    if (acceptedGroups) {
      return acceptedGroups.entities.map(id => groups.entities[id]);
    }
});

export const getSelectedGroup = createSelector(
  getGroups,
  fromAppRouter.getRouterState,
  (groups: Groups, router) => {
    return router && router.state && groups.entities[router.state.params.groupId];
  }
)

export const getApplicants = createSelector(getGroupsState, (groups: GroupsState) => groups.groupApplicants);

export const getGroupApplicants = createSelector(
  getApplicants,
  fromAppRouter.getRouterState,
  (applicants, router) => {
    return router && router.state && applicants.entities[router.state.params.groupId];
  }
)

export const getGroupApplicantsEntities = createSelector(
  getGroupApplicants,
  (applicants: any) => {
    if(applicants) {
      return Object.keys(applicants.entities).map(id => applicants.entities[parseInt(id, 10)])
    }
  }
)

export const getGroupApplicantsLoaded = createSelector(
  getGroupApplicants, (applicants) => applicants === undefined ? false : applicants.loaded
)

export const getGroupApplicantsByGroupId = (groupId) => {
  return createSelector(getApplicants, (applicants) => applicants.entities[groupId])
}

export const getGroupApplicantsLoadedByGroupId = (groupId) => {
  return createSelector(
    getGroupApplicantsByGroupId(groupId),
    (applicants) => applicants === undefined ? false : applicants.loaded)
}
