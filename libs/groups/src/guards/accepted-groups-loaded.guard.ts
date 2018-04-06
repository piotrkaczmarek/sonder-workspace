import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { tap, filter, take, switchMap, catchError } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { GroupsState, getAcceptedGroupsLoaded } from '../+state/groups.interfaces';
import { LoadAcceptedGroups } from '../+state/groups.actions';

@Injectable()
export class AcceptedGroupsLoadedGuard implements CanActivate {
  constructor(private store: Store<GroupsState>) {}

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
    return this.store.select(getAcceptedGroupsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadAcceptedGroups());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
