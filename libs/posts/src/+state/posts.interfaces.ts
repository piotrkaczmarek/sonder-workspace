import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromAppRouter from "@sonder-workspace/router";
import { Post, Comment } from "../models";

export interface PostsState {
  readonly postsByGroups: PostsByGroups;
  readonly commentsByPosts: CommentsByPost;
}

export interface PostsByGroups {
  entities: { [groupId: number]: GroupPostsState };
}

export interface GroupPostsState {
  entities: { [postId: number]: Post };
  loaded: boolean;
  loading: boolean;
}

export interface CommentsByPost {
  entities: { [postId: number]: PostCommentsState };
}

export interface PostCommentsState {
  entities: { [commentId: number]: Comment };
  post: Post;
  loaded: boolean;
  loading: boolean;
}

export const getAllPostsState = createSelector(createFeatureSelector<PostsState>("posts"), state => state);

export const getPostsByGroups = createSelector(getAllPostsState, (postsState: PostsState) => {
  return postsState.postsByGroups;
});

export const getGroupPosts = createSelector(
  getPostsByGroups,
  fromAppRouter.getRouterState,
  (postsByGroups, router) => {
    return (
      router && router.state && postsByGroups.entities[router.state.params.groupId]
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
  return createSelector(getPostsByGroups, postsByGroups => {
    return postsByGroups.entities[groupId];
  });
};

export const getGroupPostsLoadedByGroupId = groupId => {
  return createSelector(getGroupPostsByGroupId(groupId), groupPosts => {
    return groupPosts === undefined ? false : groupPosts.loaded;
  });
};

export const getCommentsByPosts = createSelector(
  getAllPostsState,
  (postsState: PostsState) => {
    return postsState.commentsByPosts;
  }
);

export const getPostComments = createSelector(
  getCommentsByPosts,
  fromAppRouter.getRouterState,
  (commentsByPost, router) => {
    return (
      router && router.state && commentsByPost.entities[router.state.params.postId]
    )
  }
)

export const getPostCommentsPost = createSelector(
  getPostComments,
  (postComments: PostCommentsState) => (postComments ? postComments.post : undefined)
)

export const getPostCommentsEntities = createSelector(
  getPostComments,
  (postComments: PostCommentsState) => {
    return Object.keys(postComments.entities).map(
      id => postComments.entities[parseInt(id, 10)]
    );
  }
)

export const getPostCommentsLoaded = createSelector(
  getPostComments,
  postComments => (postComments === undefined ? false : postComments.loaded)
);

export const getPostCommentsByPostId = postId => {
  return createSelector(getCommentsByPosts, commentsByPosts => {
    return commentsByPosts.entities[postId];
  });
}

export const getPostCommentsLoadedByPostId = postId => {
  return createSelector(
    getPostCommentsByPostId(postId),
    postComments => {
      return ( postComments === undefined ? false : postComments.loaded)
    }
  )
}
