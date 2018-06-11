import { GroupsState } from './groups.interfaces';
import { Group, Person } from '../models';

import * as fromGroupsActions from './groups.actions';

export function groupsReducer(state: GroupsState, action: fromGroupsActions.GroupsAction): GroupsState {
  switch (action.type) {
    case fromGroupsActions.SUGGESTED_GROUPS_LOADED: {
      const groupIds = action.payload.map((group: Group) => group.id);
      const suggestedGroupsEntities = action.payload.reduce(
        (entities: { [id: number]: Group }, group: Group) => {
          return {
            ...entities,
            [group.id]: group
          };
        }, {});
      return {
        ...state,
        groups: {
          ...state.groups,
          entities: {
            ...state.groups.entities,
            ...suggestedGroupsEntities
          }
        },
        ...{
          suggestedGroups: {
            entities: groupIds,
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
          suggestedGroups: {
            ...state.suggestedGroups,
            loading: true
          }
        }
      };
    }
    case fromGroupsActions.ACCEPTED_GROUPS_LOADED: {
      const groupIds = action.payload.map((group: Group) => group.id);
      const acceptedGroupsEntities = action.payload.reduce(
        (entities: { [id: number]: Group}, group: Group) => {
          return {
            ...entities,
            [group.id]: group
          };
        }, {});
      return {
        ...state,
        groups: {
          ...state.groups,
          entities: {
            ...state.groups.entities,
            ...acceptedGroupsEntities
          }
        },
        ...{
          acceptedGroups: {
            entities: groupIds,
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
          acceptedGroups: {
            ...state.acceptedGroups,
            loading: true
          }
        }
      };
    }
    case fromGroupsActions.GROUP_CREATED: {
      return {
        ...state,
        groups: {
          ...state.groups,
          entities: {
            ...state.groups.entities,
            [action.payload.id]: action.payload
          }
        },
        ...{
          acceptedGroups: {
            ...state.acceptedGroups,
            entities: [...state.acceptedGroups.entities, action.payload.id]
          }
        }
      }
    }
    case fromGroupsActions.GROUP_DISMISSED: {
      const suggestedGroupsEntities = state.suggestedGroups.entities.filter(id => id !== action.payload);
      return {
        ...state,
        suggestedGroups: {
          ...state.suggestedGroups,
          entities: suggestedGroupsEntities
        }
      }
    }
    case fromGroupsActions.GROUP_LEFT: {
      const acceptedGroupsEntities = state.acceptedGroups.entities.filter(id => id !== action.payload);
      return {
        ...state,
        acceptedGroups: {
          ...state.acceptedGroups,
          entities: acceptedGroupsEntities
        }
      }
    }
    case fromGroupsActions.GROUP_APPLIED_TO: {
      const suggestedGroupsEntities = state.suggestedGroups.entities.filter(id => id !== action.payload);
      return {
        ...state,
        suggestedGroups: {
          ...state.suggestedGroups,
          entities: suggestedGroupsEntities
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
        groupApplicants: {
          ...state.groupApplicants,
          entities: {
            ...state.groupApplicants.entities,
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
      } = state.groupApplicants.entities[groupId].entities;
      return {
        ...state,
        groupApplicants: {
          ...state.groupApplicants,
          entities: {
            ...state.groupApplicants.entities,
            [groupId]: {
              ...state.groupApplicants.entities[groupId],
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
      } = state.groupApplicants.entities[groupId].entities;
      return {
        ...state,
        groups: {
          ...state.groups,
          entities: {
            ...state.groups.entities,
            [groupId]: {
              ...state.groups.entities[groupId],
              members: [
                ...state.groups.entities[groupId].members,
                acceptedApplicant
              ]
            }
          }
        },
        groupApplicants: {
          ...state.groupApplicants,
          entities: {
            ...state.groupApplicants.entities,
            [groupId]: {
              ...state.groupApplicants.entities[groupId],
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
