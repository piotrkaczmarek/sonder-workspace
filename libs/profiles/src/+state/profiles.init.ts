import { ProfilesState } from "./profiles.interfaces";

export const profilesInitialState: ProfilesState = {
  myProfile: {
    entity: undefined,
    loaded: false,
    loading: false
  },
  profiles: {
    entities: {}
  }
};
