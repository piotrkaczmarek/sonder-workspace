import { Action } from "@ngrx/store";

export const LOG_IN = "[Auth] Log In";
export const AUTHENTICATION_FAILED = "[Auth] Authentication Failed";
export const LOGGED_IN = "[Auth] Logged In";
export const FACEBOOK_AUTHENTICATED = "[Auth] Facebook Authenticated";
export const AUTHENTICATE_BACKEND = "[Auth] Authenticate Backend";

export class LogIn implements Action {
  readonly type = LOG_IN;
}

export class AuthenticationFailed implements Action {
  readonly type = AUTHENTICATION_FAILED;
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

export type AuthAction = LogIn | AuthenticationFailed | LoggedIn | FacebookAuthenticated | AuthenticateBackend;

