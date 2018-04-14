import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Group, Person, Post } from "../models"
import * as fromAppRouter from "@sonder-workspace/router";

export interface GroupsState {
  readonly groups: Groups;
}
export interface Groups {
  suggested: SuggestedGroupsState;
  accepted: AcceptedGroupsState;
  applicants: ApplicantsState;
  posts: PostsByGroupsState;
}
export interface SuggestedGroupsState {
  entities: { [id: number]: Group };
  loaded: boolean;
  loading: boolean;
}
export interface AcceptedGroupsState {
  entities: { [id: number]: Group };
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
export interface PostsByGroupsState {
  entities: { [groupId: number]: GroupPostsState };
}
export interface GroupPostsState {
  entities: { [postId: number]: Post };
  loaded: boolean;
  loading: boolean;
}

export const getAllGroups = createSelector(createFeatureSelector<GroupsState>("groups"), state => state);

export const getSuggestedGroups = createSelector(getAllGroups, (groups: any) => groups.suggested);
export const getSuggestedGroupsLoaded = createSelector(getSuggestedGroups, suggestedGroups => suggestedGroups.loaded);
export const getSuggestedGroupsEntities = createSelector(getSuggestedGroups, (suggestedGroups: any) => {
  return Object.keys(suggestedGroups.entities).map(id => suggestedGroups.entities[parseInt(id, 10)]);
})

export const getAcceptedGroups = createSelector(getAllGroups, (groups: any) => groups.accepted);
export const getAcceptedGroupsLoaded = createSelector(getAcceptedGroups, acceptedGroups => acceptedGroups.loaded);
export const getAcceptedGroupsEntities = createSelector(getAcceptedGroups, (acceptedGroups: any) => {
  return Object.keys(acceptedGroups.entities).map(id => acceptedGroups.entities[parseInt(id, 10)]);
})

export const getSelectedAcceptedGroup = createSelector(
  getAcceptedGroups,
  fromAppRouter.getRouterState,
  (groups, router) => {
    return router && router.state && groups.entities[router.state.params.groupId];
  }
)

export const getApplicants = createSelector(getAllGroups, (groups: any) => groups.applicants);

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

export const getPostsByGroups = createSelector(
  getAllGroups,
  (groups: any) => groups.posts
);

export const getGroupPosts = createSelector(
  getPostsByGroups,
  fromAppRouter.getRouterState,
  (posts, router) => {
    return router && router.state && posts.entities[router.state.params.groupId];
  }
);

export const getGroupPostsEntities = createSelector(
  getGroupPosts,
  (groupPosts: any) => {
    if (groupPosts) {
      return Object.keys(groupPosts.entities).map(id => groupPosts.entities[parseInt(id, 10)])
    }
  }
);

export const getGroupPostsLoaded = createSelector(
  getGroupPosts,
  groupPosts => (groupPosts === undefined ? false : groupPosts.loaded)
);

export const getGroupPostsByGroupId = groupId => {
  return createSelector(
    getPostsByGroups,
    posts => posts.entities[groupId]
  );
};

export const getGroupPostsLoadedByGroupId = groupId => {
  return createSelector(
    getGroupPostsByGroupId(groupId),
    groupPosts => (groupPosts === undefined ? false : groupPosts.loaded)
  );
};
