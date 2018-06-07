import { Profile } from "../models"
import { createSelector, createFeatureSelector } from "@ngrx/store/src/selector";

export interface ProfilesState {
  readonly profiles: Profiles;
  readonly myProfile: MyProfilesState;
}
export interface MyProfilesState {
  entity: number;
  loaded: boolean;
  loading: boolean;
}
export interface Profiles {
  entities: { [profileId: number]: Profile };
}

export const getProfilesState = createSelector(createFeatureSelector<ProfilesState>("profiles"), state => state);

export const getProfiles = createSelector(getProfilesState, (profilesState: ProfilesState) => profilesState.profiles);

export const getMyProfile = createSelector(getProfilesState, (profilesState: ProfilesState) => profilesState.myProfile);
export const getMyProfileData = createSelector(
  getProfiles,
  getMyProfile,
  (profiles: Profiles, myProfile: MyProfilesState) => profiles.entities[myProfile.entity]);
export const getMyProfileLoaded = createSelector(getMyProfile, (myProfile: MyProfilesState) => myProfile.loaded);
