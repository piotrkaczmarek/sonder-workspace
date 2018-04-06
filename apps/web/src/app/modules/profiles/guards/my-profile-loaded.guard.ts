import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { tap, filter, take, switchMap, catchError } from "rxjs/operators";
import { Store } from "@ngrx/store";

import {
  ProfilesState,
  getMyProfileLoaded
} from "../+state/profiles.interfaces";
import { LoadMyProfile } from "../+state/profiles.actions";

@Injectable()
export class MyProfileLoadedGuard implements CanActivate {
  constructor(private store: Store<ProfilesState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(getMyProfileLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadMyProfile());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
