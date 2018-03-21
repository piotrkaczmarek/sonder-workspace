import {Subs} from './subs.interfaces';

export const subsInitialState: Subs = {
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
