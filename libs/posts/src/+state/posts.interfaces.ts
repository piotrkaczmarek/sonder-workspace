import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromAppRouter from "@sonder-workspace/router";
import { Post } from "../models";

export interface PostsState {
  readonly posts: PostsByGroupsState;
}

export interface PostsByGroupsState {
  entities: { [groupId: number]: GroupPostsState };
}
export interface GroupPostsState {
  entities: { [postId: number]: Post };
  loaded: boolean;
  loading: boolean;
}

export const getAllPostsState = createSelector(createFeatureSelector<PostsState>("posts"), state => state);

export const getPostsByGroups = createSelector(getAllPostsState, (postsState: any) => {
  return postsState.posts;
});

export const getGroupPosts = createSelector(
  getPostsByGroups,
  fromAppRouter.getRouterState,
  (posts, router) => {
    return (
      router && router.state && posts.entities[router.state.params.groupId]
    );
  }
);

export const getGroupPostsEntities = createSelector(
  getGroupPosts,
  (groupPosts: any) => {
    if (groupPosts) {
      return Object.keys(groupPosts.entities).map(
        id => groupPosts.entities[parseInt(id, 10)]
      );
    }
  }
);

export const getGroupPostsLoaded = createSelector(
  getGroupPosts,
  groupPosts => (groupPosts === undefined ? false : groupPosts.loaded)
);

export const getGroupPostsByGroupId = groupId => {
  return createSelector(getPostsByGroups, posts => {
    return posts.entities[groupId]
  });
};

export const getGroupPostsLoadedByGroupId = groupId => {
  return createSelector(
    getGroupPostsByGroupId(groupId),
    groupPosts => {
      return (groupPosts === undefined ? false : groupPosts.loaded)
    }
  );
};
