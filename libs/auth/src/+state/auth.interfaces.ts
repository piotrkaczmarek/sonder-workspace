import { createSelector, createFeatureSelector } from "@ngrx/store";

export interface Auth {
  loggedIn: boolean;
  loading: boolean;
  facebookAccessToken: string;
  backendAuthToken: string;
}

export interface AuthState {
  readonly auth: Auth;
}

export const getAuth = createSelector(createFeatureSelector<AuthState>("auth"), state => state);
export const getLoggedIn = createSelector(getAuth, (auth: any) => auth.loggedIn);
export const getBackendAuthToken = createSelector(getAuth, (auth: any) => auth.backendAuthToken);
