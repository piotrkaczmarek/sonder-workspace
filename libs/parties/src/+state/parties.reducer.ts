import {Parties} from './parties.interfaces';
import { Party } from '../models/party.model';

import * as fromPartiesActions from './parties.actions';

export function partiesReducer(state: Parties, action: fromPartiesActions.PartiesAction): Parties {
  switch (action.type) {
    case fromPartiesActions.SUGGESTED_PARTIES_LOADED: {
      return {
        ...state,
        ...{
          suggested: {
            entities: {...state.suggested.entities, ...action.payload },
            loaded: true,
            loading: false
          }
        }
      };
    }
    default: {
      return state;
    }
  }
}
