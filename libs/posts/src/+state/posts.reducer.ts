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
          },
          {
            // replace instead of appending
          }
        );
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
    case fromPostsActions.POST_COMMENTS_LOADED: {
      const { comments, ...post } = action.data;
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
        posts: {
          ...state.posts,
          entities: {
            ...state.posts.entities,
            [post.id]: post
          }
        },
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
        ...state.postsByGroups.entities[action.groupId].entities,
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
      return {
        ...state,
        posts: {
          ...state.posts,
          entities: {
            ...state.posts.entities,
            [action.postId]: {
              ...state.posts.entities[action.postId],
              voted: 1
            }
          }
        }
      }
    }
    case fromPostsActions.POST_DOWNVOTED: {
      return {
        ...state,
        posts: {
          ...state.posts,
          entities: {
            ...state.posts.entities,
            [action.postId]: {
              ...state.posts.entities[action.postId],
              voted: -1
            }
          }
        }
      }
    }
    default: {
      return state;
    }
  }
}
