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
  PostsState,
  getGroupPostsLoadedByGroupId
} from "../+state/posts.interfaces";
import { LoadGroupPosts } from "../+state/posts.actions";

@Injectable()
export class GroupPostsLoadedGuard implements CanActivate {
  constructor(private store: Store<PostsState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore(next.params.groupId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(groupId: number): Observable<boolean> {
    return this.store.select(getGroupPostsLoadedByGroupId(groupId)).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadGroupPosts(groupId));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
