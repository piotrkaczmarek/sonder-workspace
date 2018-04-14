import {PostsState} from './posts.interfaces';
import * as fromPostsActions from './posts.actions';
import { Post } from '../models';

export function postsReducer(state: PostsState, action: fromPostsActions.PostsAction): PostsState {
  switch (action.type) {
    case fromPostsActions.GROUP_POSTS_LOADED: {
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
            ...{
              [action.groupId]: {
                loaded: true,
                loading: false,
                entities: groupPostsEntities
              }
            }
          }
        }
      }
    }
    case fromPostsActions.POST_CREATED: {
      const groupPostsEntities = {
        ...state.posts.entities[action.groupId].entities,
        ...{ [action.payload.id]: action.payload }
      }
      const groupPosts = {
        ...state.posts.entities[action.groupId],
        ...{ entities: groupPostsEntities }
      }
      return {
        ...state,
        ...{
          posts: {
            ...state.posts,
            entities: {
              ...state.posts.entities,
              ...{ [action.groupId]: groupPosts }
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
