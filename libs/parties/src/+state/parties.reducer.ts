import {Subs} from './subs.interfaces';
import { Sub, Person } from '../models';

import * as fromSubsActions from './subs.actions';

export function subsReducer(state: Subs, action: fromSubsActions.SubsAction): Subs {
  switch (action.type) {
    case fromSubsActions.SUGGESTED_PARTIES_LOADED: {
      const suggestedEntities = action.payload.reduce(
        (entities: { [id: number]: Sub }, sub: Sub) => {
          return {
            ...entities,
            [sub.id]: sub
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
        (entities: { [id: number]: Sub}, sub: Sub) => {
          return {
            ...entities,
            [sub.id]: sub
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
      let subApplicantsEntities = action.data;
      if (subApplicantsEntities.length > 0) {
        subApplicantsEntities = action.data.reduce(
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
              [action.subId]: {
                loaded: true,
                loading: false,
                entities: subApplicantsEntities
              }
            }
          }
        }
      }
    }
    case fromSubsActions.APPLICANT_REJECTED: {
      const subId = action.payload.subId;
      const applicantId = action.payload.applicantId;
      const {
        [applicantId]: removed,
        ...remainingApplicants
      } = state.applicants.entities[subId].entities;
      return {
        ...state,
        applicants: {
          ...state.applicants,
          entities: {
            ...state.applicants.entities,
            [subId]: {
              ...state.applicants.entities[subId],
              entities: remainingApplicants
            }
          }
        }
      }
    }
    case fromSubsActions.APPLICANT_ACCEPTED: {
      const subId = action.payload.subId;
      const applicantId = action.payload.applicantId;
      const {
        [applicantId]: acceptedApplicant,
        ...remainingApplicants
      } = state.applicants.entities[subId].entities;
      return {
        ...state,
        accepted: {
          ...state.accepted,
          entities: {
            ...state.accepted.entities,
            [subId]: {
              ...state.accepted.entities[subId],
              members: [
                ...state.accepted.entities[subId].members,
                acceptedApplicant
              ]
            }
          }
        },
        applicants: {
          ...state.applicants,
          entities: {
            ...state.applicants.entities,
            [subId]: {
              ...state.applicants.entities[subId],
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
