import {Profiles} from './profiles.interfaces';
import * as fromActions from './profiles.actions';

export function profilesReducer(state: Profiles, action: fromActions.ProfilesAction): Profiles {
  switch (action.type) {
    case fromActions.MY_PROFILE_LOADED: {
      return {
        ...state,
        my: {
          data: action.payload.data,
          loaded: true,
          loading: false
        }
      };
    }
    default: {
      return state;
    }
  }
}
