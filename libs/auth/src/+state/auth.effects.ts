import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import {AuthState} from './auth.interfaces';
import * as fromAuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  logIn = this.actions.ofType(fromAuthActions.LOG_IN).pipe(
    switchMap(_ => {
      return this.authService
        .facebookLogIn()
        .pipe(
          map(
            (accessToken: string) =>
              new fromAuthActions.FacebookAuthenticated(accessToken)
          ),
          catchError(error => of(new fromAuthActions.AuthenticationFailed()))
        );
    })
  );

  @Effect({ dispatch: false })
  facebookAuthenticated = this.actions
    .ofType(fromAuthActions.FACEBOOK_AUTHENTICATED)
    .pipe(
      map((action: fromAuthActions.FacebookAuthenticated) => action.payload),
      switchMap(accessToken => {
        return this.backend
          .authenticate(accessToken)
          .pipe(
            map((data: any) => new fromAuthActions.LoggedIn(data)),
            catchError(error =>
              of(new fromAuthActions.AuthenticationFailed())
            )
          );
      })
    );

  @Effect({ dispatch: false })
  loggedIn = this.actions
    .ofType(fromAuthActions.LOGGED_IN)
    .pipe(
      map((action: fromAuthActions.LoggedIn) => action.payload),
      tap(({ path, query: queryParams, extras }) => this.router.navigate(["/"]))
    );

  @Effect({ dispatch: false })
  authenticationFailed = this.actions
    .ofType(fromAuthActions.AUTHENTICATION_FAILED)
    .pipe(
      map((action: fromAuthActions.LoggedIn) => action.payload),
      tap(({ path, query: queryParams, extras }) =>
        this.router.navigate(["/login"])
      )
    );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private backend: BackendService,
    private router: Router,
    private store: Store<AuthState>
  ) {}
}
