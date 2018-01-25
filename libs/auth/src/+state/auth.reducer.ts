import {Auth} from './auth.interfaces';
import * as fromAuthActions from './auth.actions';

export function authReducer(state: Auth, action: fromAuthActions.AuthAction): Auth {
  switch (action.type) {
    case fromAuthActions.FACEBOOK_AUTHENTICATED: {
      return {
        ...state,
        ...{
          accessToken: action.payload,
          loading: true,
          loggedIn: false
        }
      };
    }
    case fromAuthActions.LOGGED_IN: {
      return {
        ...state,
        ...{
          loading: false,
          loggedIn: true
        }
      };
    }
    default: {
      return state;
    }
  }
}
