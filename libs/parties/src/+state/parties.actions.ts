import { Action } from "@ngrx/store";

export const LOAD_SUGGESTED_PARTIES = "[Subs] Load Suggested Subs";
export const SUGGESTED_PARTIES_LOADED = "[Subs] Suggested Subs Loaded";

export const LOAD_ACCEPTED_PARTIES = "[Subs] Load Accepted Subs";
export const ACCEPTED_PARTIES_LOADED = "[Subs] Accepted Subs Loaded";

export const CREATE_PARTY = "[Subs] Create Party";
export const PARTY_CREATED = "[Subs] Party Created";

export const APPLY_TO_PARTY = "[Subs] Apply To Party";
export const PARTY_APPLIED_TO = "[Subs] Party Applied To";

export const DISMISS_PARTY = "[Subs] Dismiss Party";
export const PARTY_DISMISSED = "[Subs] Party Dismissed";

export const LEAVE_PARTY = "[Subs] Leave Party";
export const PARTY_LEFT = "[Subs] Party Left";

export const LOAD_APPLICANTS = "[Subs] Load Applicants";
export const APPLICANTS_LOADED = "[Subs] Applicants Loaded";

export const ACCEPT_APPLICANT = "[Subs] Accept Applicant";
export const APPLICANT_ACCEPTED = "[Subs] Applicant Accepted";

export const REJECT_APPLICANT = "[Subs] Reject Applicant";
export const APPLICANT_REJECTED = "[Subs] Applicant Rejected";

export class LoadSuggestedSubs implements Action {
  readonly type = LOAD_SUGGESTED_PARTIES;
}

export class SuggestedSubsLoaded implements Action {
  readonly type = SUGGESTED_PARTIES_LOADED;
  constructor(public payload: any) {}
}

export class LoadAcceptedSubs implements Action {
  readonly type = LOAD_ACCEPTED_PARTIES;
}

export class AcceptedSubsLoaded implements Action {
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

export class LeaveParty implements Action {
  readonly type = LEAVE_PARTY;
  constructor(public payload: any) {}
}

export class PartyLeft implements Action {
  readonly type = PARTY_LEFT;
  constructor(public payload: any) {}
}

export class LoadApplicants implements Action {
  readonly type = LOAD_APPLICANTS;
  constructor(public partyId: number) { }
}

export class ApplicantsLoaded implements Action {
  readonly type = APPLICANTS_LOADED;
  constructor(public data: any, public partyId: number) { }
}

export class AcceptApplicant implements Action {
  readonly type = ACCEPT_APPLICANT;
  constructor(public payload: any) { }
}

export class ApplicantAccepted implements Action {
  readonly type = APPLICANT_ACCEPTED;
  constructor(public payload: any) { }
}

export class RejectApplicant implements Action {
  readonly type = REJECT_APPLICANT;
  constructor(public payload: any) { }
}

export class ApplicantRejected implements Action {
  readonly type = APPLICANT_REJECTED;
  constructor(public payload: any) { }
}
export type SubsAction =
  | LoadSuggestedSubs
  | SuggestedSubsLoaded
  | LoadAcceptedSubs
  | AcceptedSubsLoaded
  | CreateParty
  | PartyCreated
  | ApplyToParty
  | PartyAppliedTo
  | DismissParty
  | PartyDismissed
  | LeaveParty
  | PartyLeft
  | LoadApplicants
  | ApplicantsLoaded
  | AcceptApplicant
  | ApplicantAccepted
  | RejectApplicant
  | ApplicantRejected;
