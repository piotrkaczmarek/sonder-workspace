import {Parties} from './parties.interfaces';
import { Party } from '../models/party.model';

import * as fromPartiesActions from './parties.actions';

export function partiesReducer(state: Parties, action: fromPartiesActions.PartiesAction): Parties {
  switch (action.type) {
    case fromPartiesActions.SUGGESTED_PARTIES_LOADED: {
      const suggestedEntities = action.payload.reduce(
        (entities: { [id: number]: Party }, party: Party) => {
          return {
            ...entities,
            [party.id]: party
          };
        },
        {
          ...state.suggested.entities
        }
      );
      return {
        ...state,
        ...{
          suggested: {
            entities: suggestedEntities,
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
      const acceptedEntities = action.payload.reduce(
        (entities: { [id: number]: Party}, party: Party) => {
          return {
            ...entities,
            [party.id]: party
          };
        },
        {
          ...state.accepted.entities
        }
      );
      return {
        ...state,
        ...{
          accepted: {
            entities: acceptedEntities,
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
        ...state,
        ...{
          accepted: {
            ...state.accepted,
            entities: { ...state.accepted.entities, ...{ [action.payload.id]: action.payload } }
          }
        }
      }
    }
    case fromPartiesActions.PARTY_DISMISSED: {
      const { [action.payload]: removed, ...entities } = state.suggested.entities;
      return {
        ...state,
        suggested: {
          ...state.suggested,
          entities: entities
        }
      }
    }
    case fromPartiesActions.PARTY_LEFT: {
      const { [action.payload]: removed, ...entities } = state.accepted.entities;
      return {
        ...state,
        accepted: {
          ...state.accepted,
          entities: entities
        }
      }
    }
    case fromPartiesActions.PARTY_APPLIED_TO: {
      const { [action.payload]: removed, ...entities } = state.suggested.entities;
      return {
        ...state,
        suggested: {
          ...state.suggested,
          entities: entities
        }
      }
    }
    default: {
      return state;
    }
  }
}
