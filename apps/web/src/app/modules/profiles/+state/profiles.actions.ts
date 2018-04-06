import { Action } from "@ngrx/store";

export const LOAD_MY_PROFILE = "[Profiles] Load My Profile";
export const MY_PROFILE_LOADED = "[Profiles] My Profile Loaded";

export class LoadMyProfile implements Action {
  readonly type = LOAD_MY_PROFILE;
}

export class MyProfileLoaded implements Action {
  readonly type = MY_PROFILE_LOADED;
  constructor(public payload: any) {}
}

export type ProfilesAction = LoadMyProfile | MyProfileLoaded;
