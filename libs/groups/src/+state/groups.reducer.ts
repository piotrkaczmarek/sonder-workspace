import {Groups} from './groups.interfaces';
import { Group, Person } from '../models';

import * as fromGroupsActions from './groups.actions';

export function groupsReducer(state: Groups, action: fromGroupsActions.GroupsAction): Groups {
  switch (action.type) {
    case fromGroupsActions.SUGGESTED_GROUPS_LOADED: {
      const suggestedEntities = action.payload.reduce(
        (entities: { [id: number]: Group }, group: Group) => {
          return {
            ...entities,
            [group.id]: group
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
    case fromGroupsActions.LOAD_SUGGESTED_GROUPS: {
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
    case fromGroupsActions.ACCEPTED_GROUPS_LOADED: {
      const acceptedEntities = action.payload.reduce(
        (entities: { [id: number]: Group}, group: Group) => {
          return {
            ...entities,
            [group.id]: group
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
    case fromGroupsActions.LOAD_ACCEPTED_GROUPS: {
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
    case fromGroupsActions.GROUP_CREATED: {
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
    case fromGroupsActions.GROUP_DISMISSED: {
      const { [action.payload]: removed, ...entities } = state.suggested.entities;
      return {
        ...state,
        suggested: {
          ...state.suggested,
          entities: entities
        }
      }
    }
    case fromGroupsActions.GROUP_LEFT: {
      const { [action.payload]: removed, ...entities } = state.accepted.entities;
      return {
        ...state,
        accepted: {
          ...state.accepted,
          entities: entities
        }
      }
    }
    case fromGroupsActions.GROUP_APPLIED_TO: {
      const { [action.payload]: removed, ...entities } = state.suggested.entities;
      return {
        ...state,
        suggested: {
          ...state.suggested,
          entities: entities
        }
      }
    }
    case fromGroupsActions.APPLICANTS_LOADED: {
      let groupApplicantsEntities = action.data;
      if (groupApplicantsEntities.length > 0) {
        groupApplicantsEntities = action.data.reduce(
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
              [action.groupId]: {
                loaded: true,
                loading: false,
                entities: groupApplicantsEntities
              }
            }
          }
        }
      }
    }
    case fromGroupsActions.APPLICANT_REJECTED: {
      const groupId = action.payload.groupId;
      const applicantId = action.payload.applicantId;
      const {
        [applicantId]: removed,
        ...remainingApplicants
      } = state.applicants.entities[groupId].entities;
      return {
        ...state,
        applicants: {
          ...state.applicants,
          entities: {
            ...state.applicants.entities,
            [groupId]: {
              ...state.applicants.entities[groupId],
              entities: remainingApplicants
            }
          }
        }
      }
    }
    case fromGroupsActions.APPLICANT_ACCEPTED: {
      const groupId = action.payload.groupId;
      const applicantId = action.payload.applicantId;
      const {
        [applicantId]: acceptedApplicant,
        ...remainingApplicants
      } = state.applicants.entities[groupId].entities;
      return {
        ...state,
        accepted: {
          ...state.accepted,
          entities: {
            ...state.accepted.entities,
            [groupId]: {
              ...state.accepted.entities[groupId],
              members: [
                ...state.accepted.entities[groupId].members,
                acceptedApplicant
              ]
            }
          }
        },
        applicants: {
          ...state.applicants,
          entities: {
            ...state.applicants.entities,
            [groupId]: {
              ...state.applicants.entities[groupId],
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
