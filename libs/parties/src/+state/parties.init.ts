import {Parties} from './parties.interfaces';

export const partiesInitialState: Parties = {
  // fill it initial state here
  suggested: {
    entities: {},
    loaded: false,
    loading: false
  },
  accepted: {
    entities: {},
    loaded: false,
    loading: false
  },
  applicants: {
    entities: {
    }
  }
};
