import { Action } from "@ngrx/store";

export const LOG_IN = "LOG_IN";
export const LOGGED_IN = "LOGGED_IN";
export const FACEBOOK_AUTHENTICATED = "FACEBOOK_AUTHENTICATED";
export const AUTHENTICATE_BACKEND = "AUTHENTICATE_BACKEND";

export class LogIn implements Action {
  readonly type = LOG_IN;
}

export class LoggedIn implements Action {
  readonly type = LOGGED_IN;
  constructor(public payload: any) {}
}

export class FacebookAuthenticated implements Action {
  readonly type = FACEBOOK_AUTHENTICATED;
  constructor(public payload: any) {}
}

export class AuthenticateBackend implements Action {
  readonly type = AUTHENTICATE_BACKEND;
}

export type AuthAction = LogIn
                        | LoggedIn
                        | FacebookAuthenticated
                        | AuthenticateBackend;

