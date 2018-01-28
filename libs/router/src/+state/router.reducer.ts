import {Router} from './router.interfaces';
import {RouterAction} from './router.actions';

export function routerReducer(state: Router, action: RouterAction): Router {
  switch (action.type) {
    case 'DATA_LOADED': {
      return {...state, ...action.payload};
    }
    default: {
      return state;
    }
  }
}
