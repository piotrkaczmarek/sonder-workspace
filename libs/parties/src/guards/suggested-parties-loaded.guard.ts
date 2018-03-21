import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import { SubsState, getSuggestedSubsLoaded } from '../+state/parties.interfaces';
import { LoadSuggestedSubs } from '../+state/parties.actions';

@Injectable()
export class SuggestedSubsLoadedGuard implements CanActivate {
  constructor(private store: Store<SubsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(getSuggestedSubsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadSuggestedSubs());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
