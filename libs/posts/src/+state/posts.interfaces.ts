import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromAppRouter from "@sonder-workspace/router";
import { Post, Comment } from "../models";
import { isEqual } from "lodash";

export interface PostsState {
  readonly postsByGroups: PostsByGroups;
  readonly commentsByPosts: CommentsByPost;
  readonly posts: Posts;
}

export interface PostsByGroups {
  entities: { [groupId: number]: GroupPostsState };
}

export interface Posts {
  entities: { [postId: number]: Post };
  loaded: boolean;
  loading: boolean;
}

export interface GroupPostsState {
  entities: Array<number>;
  loaded: boolean;
  loading: boolean;
}

export interface CommentsByPost {
  entities: { [postId: number]: PostCommentsState };
}

export interface PostCommentsState {
  entities: { [commentId: number]: Comment };
  loaded: boolean;
  loading: boolean;
}

export const getPostsState = createSelector(createFeatureSelector<PostsState>("posts"), state => state);

export const getPosts = createSelector(getPostsState, (postsState: PostsState) => {
  return postsState.posts;
});

export const getPostsEntities = createSelector(getPosts, (posts) => {
  if(posts) {
    return Object.keys(posts.entities).map(
      id => posts.entities[parseInt(id, 10)]
    );
  }
});

export const getPostsLoaded = createSelector(getPosts, (posts) => posts.loaded);

export const getPostLoadedByPostId = postId => {
  return createSelector(getPosts, posts => {
    return posts.entities[postId] === undefined ? false : true;
  });
};

export const getPostsByGroups = createSelector(getPostsState, (postsState: PostsState) => {
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
  getPosts,
  getGroupPosts,
  (posts: Posts, groupPosts: GroupPostsState) => {
    if (groupPosts) {
      return groupPosts.entities.map(id => posts.entities[id]);
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
  getPostsState,
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

export const getSelectedPost = createSelector(
  getPosts,
  fromAppRouter.getRouterState,
  (posts: Posts, router) => router && router.state && posts.entities[router.state.params.postId]
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

export const getPostCommentsChildren = (postId, parentIds) => {
  return createSelector(
    getPostCommentsByPostId(postId),
    (postComments) => {
      if (!postComments.entities) return;
      return Object.keys(postComments.entities)
        .filter((id) => isEqual(postComments.entities[parseInt(id, 10)].parentIds, parentIds))
        .map((id) => postComments.entities[parseInt(id, 10)]);
    }
  )
};
