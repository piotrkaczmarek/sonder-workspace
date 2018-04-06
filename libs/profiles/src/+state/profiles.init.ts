import {Profiles} from './profiles.interfaces';

export const profilesInitialState: Profiles = {
  // fill it initial state here
  my: {
    data: {
      id: undefined,
      first_name: undefined
    },
    loaded: false,
    loading: false
  }
};
