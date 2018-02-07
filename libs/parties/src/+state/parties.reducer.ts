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
    case fromPartiesActions.LOAD_SUGGESTED_PARTIES: {
      return {
        ...state,
        ...{
          suggested: {
            ...state.suggested,
            loading: true
          }
        }
      };
    }
    case fromPartiesActions.ACCEPTED_PARTIES_LOADED: {
      return {
        ...state,
        ...{
          accepted: {
            entities: {...state.accepted.entities, ...action.payload },
            loaded: true,
            loading: false
          }
        }
      };
    }
    case fromPartiesActions.LOAD_ACCEPTED_PARTIES: {
      return {
        ...state,
        ...{
          accepted: {
            ...state.accepted,
            loading: true
          }
        }
      };
    }
    case fromPartiesActions.PARTY_CREATED: {
      return {
        ...state
      }
    }
    default: {
      return state;
    }
  }
}
