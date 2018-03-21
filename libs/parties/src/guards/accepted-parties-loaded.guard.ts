import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { tap, filter, take, switchMap, catchError } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { SubsState, getAcceptedSubsLoaded } from '../+state/parties.interfaces';
import { LoadAcceptedSubs } from '../+state/parties.actions';

@Injectable()
export class AcceptedSubsLoadedGuard implements CanActivate {
  constructor(private store: Store<SubsState>) {}

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
    return this.store.select(getAcceptedSubsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadAcceptedSubs());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
