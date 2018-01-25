import { createSelector, createFeatureSelector } from "@ngrx/store";

export interface Auth {
  loggedIn: boolean;
  loading: boolean;
  accessToken: string;
}

export interface AuthState {
  readonly auth: Auth;
}

export const getAuth = createSelector(createFeatureSelector<AuthState>("auth"), state => state);
export const getLoggedIn = createSelector(getAuth, (auth: any) => auth.loggedIn);
export const getAccessToken = createSelector(getAuth, (auth: any) => auth.accessToken);
