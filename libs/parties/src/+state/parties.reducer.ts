import {Parties} from './parties.interfaces';
import {PartiesAction} from './parties.actions';

export function partiesReducer(state: Parties, action: PartiesAction): Parties {
  switch (action.type) {
    case 'DATA_LOADED': {
      return {...state, ...action.payload};
    }
    default: {
      return state;
    }
  }
}
