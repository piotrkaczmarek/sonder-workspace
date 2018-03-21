import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { tap, filter, take, switchMap, catchError } from "rxjs/operators";

import {
  SubsState,
  getSubFeedLoadedBySubId
} from "../+state/subs.interfaces";
import { LoadFeed } from "../+state/subs.actions";

@Injectable()
export class FeedLoadedGuard implements CanActivate {
  constructor(private store: Store<SubsState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore(next.params.subId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(subId: number): Observable<boolean> {
    return this.store.select(getSubFeedLoadedBySubId(subId)).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadFeed(subId));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
