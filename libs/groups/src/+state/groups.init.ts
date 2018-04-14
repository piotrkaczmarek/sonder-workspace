import {Groups} from './groups.interfaces';

export const groupsInitialState: Groups = {
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
  },
  posts: {
    entities: {
    }
  }
};
