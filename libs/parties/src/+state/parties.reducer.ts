import {Parties} from './parties.interfaces';
import * as fromPartiesActions from './parties.actions';

export function partiesReducer(state: Parties, action: fromPartiesActions.PartiesAction): Parties {
  switch (action.type) {
    case fromPartiesActions.SUGGESTED_PARTIES_LOADED: {
      return {...state, ...action.payload};
    }
    default: {
      return state;
    }
  }
}
