import { ProfilesState } from './profiles.interfaces';
import * as fromActions from './profiles.actions';

export function profilesReducer(state: ProfilesState, action: fromActions.ProfilesAction): ProfilesState {
  switch (action.type) {
    case fromActions.MY_PROFILE_LOADED: {
      return {
        ...state,
        profiles: {
          entities: {
            ...state.profiles.entities,
            [action.payload.data.id]: action.payload.data
          }
        },
        myProfile: {
          entity: action.payload.data.id,
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
