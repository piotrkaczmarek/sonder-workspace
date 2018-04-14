import {Posts} from './posts.interfaces';
import {PostsAction} from './posts.actions';

export function postsReducer(state: Posts, action: PostsAction): Posts {
  switch (action.type) {
    case 'DATA_LOADED': {
      return {...state, ...action.payload};
    }
    default: {
      return state;
    }
  }
}
