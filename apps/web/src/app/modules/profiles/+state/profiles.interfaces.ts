import { Profile } from "../models"
import { createSelector, createFeatureSelector } from "@ngrx/store/src/selector";

export interface ProfilesState {
  readonly profiles: Profiles;
}
export interface MyProfileState {
  data: Profile;
  loaded: boolean;
  loading: boolean;
}
export interface Profiles {
  my: MyProfileState;
}

export const getProfiles = createSelector(createFeatureSelector<ProfilesState>("profiles"), state => state);

export const getMyProfile = createSelector(getProfiles, (profiles: any) => profiles.my);
export const getMyProfileData = createSelector(getMyProfile, (myProfile: any) => myProfile.data);

export const getMyProfileLoaded = createSelector(getMyProfile, myProfile => myProfile.loaded);
