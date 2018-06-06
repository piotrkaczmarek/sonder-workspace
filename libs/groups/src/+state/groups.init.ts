import { GroupsState } from './groups.interfaces';

export const groupsInitialState: GroupsState = {
  groups: {
    entities: {}
  },
  suggestedGroups: {
    entities: [],
    loaded: false,
    loading: false
  },
  acceptedGroups: {
    entities: [],
    loaded: false,
    loading: false
  },
  groupApplicants: {
    entities: {
    }
  }
};
