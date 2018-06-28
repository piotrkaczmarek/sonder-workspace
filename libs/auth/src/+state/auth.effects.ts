import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import { map, filter, tap, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { AuthState } from './auth.interfaces';
import * as fromAuthActions from './auth.actions';
import { AuthService, AUTH_SERVICE, BackendService, BACKEND_SERVICE } from '../services';
import { Store } from "@ngrx/store";
import * as fromAppRouter from "@sonder-workspace/router";

@Injectable()
export class AuthEffects {
  @Effect()
  logIn = this.actions.ofType(fromAuthActions.LOG_IN).pipe(
    map((action: fromAuthActions.LogIn) => action),
    switchMap(() => {
      return this.authService.facebookLogIn().pipe(
        map((accessToken: string) => {
          return new fromAuthActions.FacebookAuthenticated(accessToken);
        }),
        catchError(error => {
          this.store.dispatch(new fromAuthActions.AuthenticationFailed());
          console.error("Error", error);
          return of(error);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  logOut = this.actions.ofType(fromAuthActions.LOG_OUT).pipe(
    map((action: fromAuthActions.LogOut) => action),
    tap(() => {
      localStorage.clear();
      this.store.dispatch(
        new fromAppRouter.Go({
          path: ["/login"]
        })
      );
      this.store.dispatch(new fromAuthActions.LoggedOut());
    })
  );

  @Effect()
  facebookAuthenticated = this.actions
    .ofType(fromAuthActions.FACEBOOK_AUTHENTICATED)
    .pipe(
      map((action: fromAuthActions.FacebookAuthenticated) => action.payload),
      switchMap(accessToken => {
        return this.backend.authenticate(accessToken).pipe(
          map((data: any) => new fromAuthActions.LoggedIn(data)),
          catchError(error => {
            this.store.dispatch(new fromAuthActions.AuthenticationFailed());
            console.error("Error", error);
            return of(error);
          })
        );
      })
    );

  @Effect({ dispatch: false })
  loggedIn = this.actions.ofType(fromAuthActions.LOGGED_IN).pipe(
    map((action: fromAuthActions.LoggedIn) => action.payload),
    tap(({ path, query: queryParams, extras }) =>
      this.store.dispatch(
        new fromAppRouter.Go({
          path: ["/"]
        })
      )
    )
  );

  @Effect()
  authenticationFailed = this.actions
    .ofType(fromAuthActions.AUTHENTICATION_FAILED)
    .pipe(
      tap(() => new fromAppRouter.Go({ path: ["/login"] }))
    );

  private backend: BackendService;
  private authService: AuthService;

  constructor(
    private actions: Actions,
    @Inject(BACKEND_SERVICE) backend,
    @Inject(AUTH_SERVICE) authService,
    private store: Store<AuthState>
  ) {
    this.backend = backend;
    this.authService = authService;
  }
}
