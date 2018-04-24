import {Profiles} from './profiles.interfaces';

export const profilesInitialState: Profiles = {
  // fill it initial state here
  my: {
    data: {
      id: undefined,
      firstName: undefined
    },
    loaded: false,
    loading: false
  }
};
