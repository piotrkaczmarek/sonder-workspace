import {Subs} from './parties.interfaces';
import { Party, Person } from '../models';

import * as fromSubsActions from './parties.actions';

export function partiesReducer(state: Subs, action: fromSubsActions.SubsAction): Subs {
  switch (action.type) {
    case fromSubsActions.SUGGESTED_PARTIES_LOADED: {
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
    case fromSubsActions.LOAD_SUGGESTED_PARTIES: {
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
    case fromSubsActions.ACCEPTED_PARTIES_LOADED: {
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
    case fromSubsActions.LOAD_ACCEPTED_PARTIES: {
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
    case fromSubsActions.PARTY_CREATED: {
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
    case fromSubsActions.PARTY_DISMISSED: {
      const { [action.payload]: removed, ...entities } = state.suggested.entities;
      return {
        ...state,
        suggested: {
          ...state.suggested,
          entities: entities
        }
      }
    }
    case fromSubsActions.PARTY_LEFT: {
      const { [action.payload]: removed, ...entities } = state.accepted.entities;
      return {
        ...state,
        accepted: {
          ...state.accepted,
          entities: entities
        }
      }
    }
    case fromSubsActions.PARTY_APPLIED_TO: {
      const { [action.payload]: removed, ...entities } = state.suggested.entities;
      return {
        ...state,
        suggested: {
          ...state.suggested,
          entities: entities
        }
      }
    }
    case fromSubsActions.APPLICANTS_LOADED: {
      let partyApplicantsEntities = action.data;
      if (partyApplicantsEntities.length > 0) {
        partyApplicantsEntities = action.data.reduce(
          (entities: { [id: number]: Person }, person: Person) => {
            return {
              ...entities,
              [person.id]: person
            };
          },
          { // replace instead of appending
          }
        );
      }
      return {
        ...state,
        applicants: {
          ...state.applicants,
          entities: {
            ...state.applicants.entities,
            ...{
              [action.partyId]: {
                loaded: true,
                loading: false,
                entities: partyApplicantsEntities
              }
            }
          }
        }
      }
    }
    case fromSubsActions.APPLICANT_REJECTED: {
      const partyId = action.payload.partyId;
      const applicantId = action.payload.applicantId;
      const {
        [applicantId]: removed,
        ...remainingApplicants
      } = state.applicants.entities[partyId].entities;
      return {
        ...state,
        applicants: {
          ...state.applicants,
          entities: {
            ...state.applicants.entities,
            [partyId]: {
              ...state.applicants.entities[partyId],
              entities: remainingApplicants
            }
          }
        }
      }
    }
    case fromSubsActions.APPLICANT_ACCEPTED: {
      const partyId = action.payload.partyId;
      const applicantId = action.payload.applicantId;
      const {
        [applicantId]: acceptedApplicant,
        ...remainingApplicants
      } = state.applicants.entities[partyId].entities;
      return {
        ...state,
        accepted: {
          ...state.accepted,
          entities: {
            ...state.accepted.entities,
            [partyId]: {
              ...state.accepted.entities[partyId],
              members: [
                ...state.accepted.entities[partyId].members,
                acceptedApplicant
              ]
            }
          }
        },
        applicants: {
          ...state.applicants,
          entities: {
            ...state.applicants.entities,
            [partyId]: {
              ...state.applicants.entities[partyId],
              entities: remainingApplicants
            }
          }
        }
      }
    }
    default: {
      return state;
    }
  }
}
