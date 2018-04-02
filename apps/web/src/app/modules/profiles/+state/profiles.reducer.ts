import {Profiles} from './profiles.interfaces';
import {ProfilesAction} from './profiles.actions';

export function profilesReducer(state: Profiles, action: ProfilesAction): Profiles {
  switch (action.type) {
    case 'DATA_LOADED': {
      return {...state, ...action.payload};
    }
    default: {
      return state;
    }
  }
}
