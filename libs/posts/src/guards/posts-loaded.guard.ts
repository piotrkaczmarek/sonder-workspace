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
  getPostsFromAcceptedGroupsLoaded
} from "../+state/posts.interfaces";
import { LoadPosts } from "../+state/posts.actions";

@Injectable()
export class PostsLoadedGuard implements CanActivate {
  constructor(private store: Store<PostsState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore(next.params.postId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(postId: number): Observable<boolean> {
    return this.store.select(getPostsFromAcceptedGroupsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadPosts());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
