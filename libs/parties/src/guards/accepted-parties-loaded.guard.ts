import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { tap, filter, take, switchMap, catchError } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { PartiesState, getAcceptedPartiesLoaded } from '../+state/parties.interfaces';
import { LoadAcceptedParties } from '../+state/parties.actions';

@Injectable()
export class AcceptedPartiesLoadedGuard implements CanActivate {
  constructor(private store: Store<PartiesState>) {}

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
    return this.store.select(getAcceptedPartiesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadAcceptedParties());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
