import { Injectable, Inject } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { DataPersistence } from "@nrwl/nx";
import { of } from "rxjs/observable/of";
import { map, tap, catchError } from "rxjs/operators";
import * as fromAuth from "@sonder-workspace/auth";
import { AppBackendService } from "../services/backend.service";
import { Store } from "@ngrx/store";
import * as fromAppRouter from "@sonder-workspace/router";

@Injectable()
export class AuthEffects {
  @Effect()
  logIn = this.dataPersistence.pessimisticUpdate(fromAuth.LOG_IN, {
    run: (action: fromAuth.LogIn, state: fromAuth.AuthState) => {
      return this.authService
        .facebookLogIn()
        .pipe(
          map(
            (accessToken: string) =>
              new fromAuth.FacebookAuthenticated(accessToken)
          )
        );
    },

    onError: (action: fromAuth.LogIn, error) => {
      this.store.dispatch(new fromAuth.AuthenticationFailed());
      console.error("Error", error);
    }
  });

  @Effect({ dispatch: false })
  logOut = this.actions.ofType(fromAuth.LOG_OUT).pipe(
    map((action: fromAuth.LogOut) => action),
    tap(() => {
      localStorage.clear();
      this.store.dispatch(
        new fromAppRouter.Go({
          path: ["/login"]
        })
      );
      this.store.dispatch(new fromAuth.LoggedOut());
    })
  );

  @Effect()
  facebookAuthenticated = this.dataPersistence.pessimisticUpdate(
    fromAuth.FACEBOOK_AUTHENTICATED,
    {
      run: (action: fromAuth.LogIn, state: fromAuth.AuthState) => {
        return this.backend
          .authenticate(state.auth.facebookAccessToken)
          .pipe(map((data: any) => new fromAuth.LoggedIn(data)));
      },

      onError: (action: fromAuth.LogIn, error) => {
        this.store.dispatch(new fromAuth.AuthenticationFailed());
        console.error("Error", error);
      }
    }
  );

  @Effect({ dispatch: false })
  loggedIn = this.actions.ofType(fromAuth.LOGGED_IN).pipe(
    map((action: fromAuth.LoggedIn) => action.payload),
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
    .ofType(fromAuth.AUTHENTICATION_FAILED)
    .pipe(
      map((action: fromAuth.LoggedIn) => action.payload),
      tap(({ path, query: queryParams, extras }) =>
        this.store.dispatch(
          new fromAppRouter.Go({
            path: ["/login"]
          })
        )
      )
    );

  constructor(
    private actions: Actions,
    private dataPersistence: DataPersistence<fromAuth.AuthState>,
    private authService: fromAuth.AuthService,
    private backend: AppBackendService,
    private store: Store<fromAuth.AuthState>
  ) {
  }
}
