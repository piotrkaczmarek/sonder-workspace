import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import { PartiesState, getSuggestedPartiesLoaded } from '../+state/parties.interfaces';
import { LoadSuggestedParties } from '../+state/parties.actions';

@Injectable()
export class SuggestedPartiesGuard implements CanActivate {
  constructor(private store: Store<PartiesState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(getSuggestedPartiesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadSuggestedParties());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
