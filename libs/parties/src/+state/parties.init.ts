import {Parties} from './parties.interfaces';

export const partiesInitialState: Parties = {
  // fill it initial state here
  suggested: [
    {
      id: 5,
      name: 'Team A'
    },
    {
      id: 6,
      name: 'The Cherries'
    }
  ],
  accepted: []
};
