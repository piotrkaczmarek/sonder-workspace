import { Action } from "@ngrx/store";

export const LOAD_SUGGESTED_PARTIES = "[Parties] Load Suggested Parties";
export const SUGGESTED_PARTIES_LOADED = "[Parties] Suggested Parties Loaded";
export const LOAD_ACCEPTED_PARTIES = "[Parties] Load Accepted Parties";
export const ACCEPTED_PARTIES_LOADED = "[Parties] Accepted Parties Loaded";

export const CREATE_PARTY = "[Parties] Create Party";
export const PARTY_CREATED = "[Parties] Party Created";
export const APPLY_TO_PARTY = "[Parties] Apply To Party";
export const PARTY_APPLIED_TO = "[Parties] Party Applied To";
export const DISMISS_PARTY = "[Parties] Dismiss Party";
export const PARTY_DISMISSED = "[Parties] Party Dismissed";

export class LoadSuggestedParties implements Action {
  readonly type = LOAD_SUGGESTED_PARTIES;
}

export class SuggestedPartiesLoaded implements Action {
  readonly type = SUGGESTED_PARTIES_LOADED;
  constructor(public payload: any) {}
}

export class LoadAcceptedParties implements Action {
  readonly type = LOAD_ACCEPTED_PARTIES;
}

export class AcceptedPartiesLoaded implements Action {
  readonly type = ACCEPTED_PARTIES_LOADED;
  constructor(public payload: any) {}
}

export class CreateParty implements Action {
  readonly type = CREATE_PARTY;
  constructor(public payload: any) {}
}

export class PartyCreated implements Action {
  readonly type = PARTY_CREATED;
  constructor(public payload: any) {}
}

export class ApplyToParty implements Action {
  readonly type = APPLY_TO_PARTY;
  constructor(public payload: any) {}
}

export class PartyAppliedTo implements Action {
  readonly type = PARTY_APPLIED_TO;
  constructor(public payload: any) {}
}

export class DismissParty implements Action {
  readonly type = DISMISS_PARTY;
  constructor(public payload: any) {}
}

export class PartyDismissed implements Action {
  readonly type = PARTY_DISMISSED;
  constructor(public payload: any) {}
}

export type PartiesAction =
  | LoadSuggestedParties
  | SuggestedPartiesLoaded
  | LoadAcceptedParties
  | AcceptedPartiesLoaded
  | CreateParty
  | PartyCreated
  | ApplyToParty
  | PartyAppliedTo
  | DismissParty
  | PartyDismissed;
