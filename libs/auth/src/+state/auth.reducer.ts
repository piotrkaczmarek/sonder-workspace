import {Auth} from './auth.interfaces';
import * as fromAuthActions from './auth.actions';

export function authReducer(state: Auth, action: fromAuthActions.AuthAction): Auth {
  switch (action.type) {
    case fromAuthActions.LOG_IN: {
      return {
        ...state,
        ...{
          loading: true,
          loggedIn: false
        }
      }
    }
    case fromAuthActions.AUTHENTICATION_FAILED: {
      return {
        ...state,
        ...{
          facebookAccessToken: null,
          loading: false,
          loggedIn: false
        }
      }
    }
    case fromAuthActions.FACEBOOK_AUTHENTICATED: {
      return {
        ...state,
        ...{
          facebookAccessToken: action.payload,
          loading: true,
          loggedIn: false
        }
      };
    }
    case fromAuthActions.LOGGED_IN: {
      return {
        ...state,
        ...{
          backendAuthToken: action.payload,
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
