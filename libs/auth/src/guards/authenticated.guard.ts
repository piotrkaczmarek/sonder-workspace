import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { tap, filter, take, switchMap, catchError } from "rxjs/operators";

import {
  AuthState,
  getLoggedIn
} from "../+state/auth.interfaces";
import * as fromAppRouter from "@sonder-workspace/router";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => {
        this.store.dispatch(new fromAppRouter.Go({ path: ["/login"] }));
        return of(false);
      }));
  }

  checkStore(): Observable<boolean> {
    return this.store.select(getLoggedIn).pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          throw new ErrorObservable(new Error('Not authenticated'));
        }
      })
    );
  }
}
