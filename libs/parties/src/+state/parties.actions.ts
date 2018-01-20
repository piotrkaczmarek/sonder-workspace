import { Action } from "@ngrx/store";

export const LOAD_SUGGESTED_PARTIES = "LOAD_SUGGESTED_PARTIES";
export const SUGGESTED_PARTIES_LOADED = "SUGGESTED_PARTIES_LOADED";

export class LoadSuggestedParties implements Action {
  readonly type = LOAD_SUGGESTED_PARTIES;
  constructor(public payload: any) {}
}

export class SuggestedPartiesLoaded implements Action {
  readonly type = SUGGESTED_PARTIES_LOADED;
  constructor(public payload: any) {}
}

export type PartiesAction = LoadSuggestedParties | SuggestedPartiesLoaded;
