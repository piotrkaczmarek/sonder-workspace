import {PostsState} from './posts.interfaces';
import * as fromPostsActions from './posts.actions';
import { Post } from '../models';

export function postsReducer(state: PostsState, action: fromPostsActions.PostsAction): PostsState {
  switch (action.type) {
    case fromPostsActions.GROUP_POSTS_LOADED: {
      const postIds = action.data.map((post: Post) => post.id);
      let groupPostsEntities = action.data;
      if (groupPostsEntities.length > 0) {
        groupPostsEntities = action.data.reduce(
          (entities: { [id: number]: Post }, post: Post) => {
            return {
              ...entities,
              [post.id]: post
            };
          }, {});
      }
      return {
        ...state,
        posts: {
          ...state.posts,
          entities: {
            ...state.posts.entities,
            ...groupPostsEntities
          }
        },
        postsByGroups: {
          ...state.postsByGroups,
          entities: {
            ...state.postsByGroups.entities,
            ...{
              [action.groupId]: {
                loaded: true,
                loading: false,
                entities: postIds
              }
            }
          }
        }
      }
    }
    case fromPostsActions.POST_LOADED: {
      return {
        ...state,
        posts: {
          ...state.posts,
          entities: {
            ...state.posts.entities,
            [action.postId]: action.payload
          }
        }
      }
    }
    case fromPostsActions.POSTS_LOADED: {
      const posts = action.payload;
      let postsEntities;
      if (posts.length > 0) {
        postsEntities = posts.reduce(
          (entities, post) => {
            return {
              ...entities,
              [post.id]: post
            }
          },
          {}
        )
      }
      return {
        ...state,
        posts: {
          ...state.posts,
          loaded: true,
          loading: false,
          entities: {
            ...state.posts.entities,
            ...postsEntities
          }
        }
      }
    }
    case fromPostsActions.POST_COMMENTS_LOADED: {
      const comments = action.data;
      let commentEntities;
      if (comments.length > 0 ) {
        commentEntities = comments.reduce(
          (entities, comment) => {
            return {
              ...entities,
              [comment.id]: comment
            }
          }
        , {})
      }
      return {
        ...state,
        commentsByPosts: {
          ...state.commentsByPosts,
          entities: {
            ...state.commentsByPosts.entities,
            ...{
              [action.postId]: {
                entities: commentEntities,
                loaded: true,
                loading: false
              }
            }
          }
        }
      }
    }
    case fromPostsActions.POST_CREATED: {
      const post = action.payload;
      const groupPostsEntities = [
        ...(state.postsByGroups.entities[action.groupId] && state.postsByGroups.entities[action.groupId].entities || []),
        post.id
      ]
      const groupPosts = {
        ...state.postsByGroups.entities[action.groupId],
        ...{ entities: groupPostsEntities }
      }
      return {
        ...state,
        posts: {
          ...state.posts,
          entities: {
            ...state.posts.entities,
            [post.id]: post
          }
        },
        ...{
          postsByGroups: {
            ...state.postsByGroups,
            entities: {
              ...state.postsByGroups.entities,
              ...{ [action.groupId]: groupPosts }
            }
          }
        }
      }
    }
    case fromPostsActions.COMMENT_CREATED: {
      const postCommentsEntities = {
        ...state.commentsByPosts.entities[action.postId].entities,
        ...{ [action.data.id]: action.data }
      }
      const postComments = {
        ...state.commentsByPosts.entities[action.postId],
        ...{ entities: postCommentsEntities }
      }
      return {
        ...state,
        ...{
          commentsByPosts: {
            ...state.commentsByPosts,
            entities: {
              ...state.commentsByPosts.entities,
              ...{ [action.postId]: postComments }
            }
          }
        }
      }
    }
    case fromPostsActions.POST_UPVOTED: {
      const post = state.posts.entities[action.postId];
      return {
        ...state,
        posts: {
          ...state.posts,
          entities: {
            ...state.posts.entities,
            [action.postId]: {
              ...post,
              points: (post.points - post.voted) + 1,
              voted: 1
            }
          }
        }
      }
    }
    case fromPostsActions.POST_DOWNVOTED: {
      const post = state.posts.entities[action.postId];
      return {
        ...state,
        posts: {
          ...state.posts,
          entities: {
            ...state.posts.entities,
            [action.postId]: {
              ...post,
              points: (post.points - post.voted) - 1,
              voted: -1
            }
          }
        }
      }
    }
    case fromPostsActions.POST_VOTE_REVOKED: {
      const post = state.posts.entities[action.postId];
      return {
        ...state,
        posts: {
          ...state.posts,
          entities: {
            ...state.posts.entities,
            [action.postId]: {
              ...post,
              points: post.points - post.voted,
              voted: 0
            }
          }
        }
      }
    }
    case fromPostsActions.COMMENT_UPVOTED: {
      const comment = state.commentsByPosts.entities[action.postId].entities[action.commentId];
      const postComments = {
        ...state.commentsByPosts.entities[action.postId],
        entities: {
          ...state.commentsByPosts.entities[action.postId].entities,
          [action.commentId]: {
            ...comment,
            points: (comment.points - comment.voted) + 1,
            voted: 1
          }
        }
      }
      return {
        ...state,
        commentsByPosts: {
          ...state.commentsByPosts,
          entities: {
            ...state.commentsByPosts.entities,
            [action.postId]: postComments
          }
        }
      }
    }
    case fromPostsActions.COMMENT_DOWNVOTED: {
      const comment = state.commentsByPosts.entities[action.postId].entities[action.commentId];
      const postComments = {
        ...state.commentsByPosts.entities[action.postId],
        entities: {
          ...state.commentsByPosts.entities[action.postId].entities,
          [action.commentId]: {
            ...comment,
            points: (comment.points - comment.voted) - 1,
            voted: -1
          }
        }
      }
      return {
        ...state,
        commentsByPosts: {
          ...state.commentsByPosts,
          entities: {
            ...state.commentsByPosts.entities,
            [action.postId]: postComments
          }
        }
      }
    }
    case fromPostsActions.COMMENT_VOTE_REVOKED: {
      const comment = state.commentsByPosts.entities[action.postId].entities[action.commentId];
      const postComments = {
        ...state.commentsByPosts.entities[action.postId],
        entities: {
          ...state.commentsByPosts.entities[action.postId].entities,
          [action.commentId]: {
            ...comment,
            points: comment.points - comment.voted,
            voted: 0
          }
        }
      }
      return {
        ...state,
        commentsByPosts: {
          ...state.commentsByPosts,
          entities: {
            ...state.commentsByPosts.entities,
            [action.postId]: postComments
          }
        }
      }
    }
    default: {
      return state;
    }
  }
}
