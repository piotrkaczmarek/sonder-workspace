import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import { GroupsState, getSuggestedGroupsLoaded } from '../+state/groups.interfaces';
import { LoadSuggestedGroups } from '../+state/groups.actions';

@Injectable()
export class SuggestedGroupsLoadedGuard implements CanActivate {
  constructor(private store: Store<GroupsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(getSuggestedGroupsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadSuggestedGroups());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
