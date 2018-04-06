import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthState } from './auth.interfaces';
import * as fromAuthActions from './auth.actions';
import { AuthService, AUTH_SERVICE, BackendService, BACKEND_SERVICE } from '../services';
import { Store } from "@ngrx/store";
import * as fromAppRouter from "@sonder-workspace/router";

@Injectable()
export class AuthEffects {
  @Effect()
  logIn = this.dataPersistence.pessimisticUpdate(fromAuthActions.LOG_IN, {
    run: (action: fromAuthActions.LogIn, state: AuthState) => {
      return this.authService
        .facebookLogIn()
        .pipe(
          map(
            (accessToken: string) =>
              new fromAuthActions.FacebookAuthenticated(accessToken)
          )
        );
    },

    onError: (action: fromAuthActions.LogIn, error) => {
      this.store.dispatch(new fromAuthActions.AuthenticationFailed());
      console.error("Error", error);
    }
  });

  @Effect({ dispatch: false })
  logOut = this.actions
    .ofType(fromAuthActions.LOG_OUT)
    .pipe(
      map((action: fromAuthActions.LogOut) => action),
      tap(() => {
        localStorage.clear();
        this.store.dispatch(
          new fromAppRouter.Go({
            path: ["/login"]
          })
        );
        this.store.dispatch(new fromAuthActions.LoggedOut());
      }
      )
    );

  @Effect()
  facebookAuthenticated = this.dataPersistence.pessimisticUpdate(
    fromAuthActions.FACEBOOK_AUTHENTICATED,
    {
      run: (action: fromAuthActions.LogIn, state: AuthState) => {
        return this.backend
          .authenticate(state.auth.facebookAccessToken)
          .pipe(map((data: any) => new fromAuthActions.LoggedIn(data)));
      },

      onError: (action: fromAuthActions.LogIn, error) => {
        this.store.dispatch(new fromAuthActions.AuthenticationFailed());
        console.error("Error", error);
      }
    }
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

  @Effect({ dispatch: false })
  authenticationFailed = this.actions
    .ofType(fromAuthActions.AUTHENTICATION_FAILED)
    .pipe(
      map((action: fromAuthActions.LoggedIn) => action.payload),
      tap(({ path, query: queryParams, extras }) =>
        this.store.dispatch(
          new fromAppRouter.Go({
            path: ["/login"]
          })
        )
      )
    );

  private backend: BackendService;
  private authService: AuthService;

  constructor(
    private actions: Actions,
    private dataPersistence: DataPersistence<AuthState>,
    @Inject(BACKEND_SERVICE) backend,
    @Inject(AUTH_SERVICE) authService,
    private store: Store<AuthState>
  ) {
    this.backend = backend;
    this.authService = authService;
  }
}
