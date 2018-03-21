import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import { SubsState, getSubApplicantsLoadedBySubId } from '../+state/parties.interfaces';
import { LoadApplicants } from '../+state/parties.actions';

@Injectable()
export class ApplicantsLoadedGuard implements CanActivate {
  constructor(private store: Store<SubsState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore(next.params.partyId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(partyId: number): Observable<boolean> {
    return this.store.select(getSubApplicantsLoadedBySubId(partyId)).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadApplicants(partyId));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
