import {Parties} from './parties.interfaces';

export const partiesInitialState: Parties = {
  // fill it initial state here
  suggested: {
    entities: {
      1: {
        id: 5,
        name: 'Team A'
      },
      2: {
        id: 6,
        name: 'The Cherries'
      }
    },
    loaded: true,
    loading: false
  },
  accepted: {
    entities: {},
    loaded: true,
    loading: false
  }
};
