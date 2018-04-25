import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import { map, tap, switchMap, catchError } from "rxjs/operators";
import {PostsState} from './posts.interfaces';
import { PostsService } from "../services";
import * as fromPostActions from './posts.actions';

@Injectable()
export class PostsEffects {
  @Effect()
  loadGroupPosts = this.actions.ofType(fromPostActions.LOAD_GROUP_POSTS).pipe(
    map((action: fromPostActions.LoadGroupPosts) => action),
    switchMap(action => {
      return this.postsService.getGroupPosts(action.groupId).pipe(
        map((response: any) => response.data),
        map(
          (data: any) =>
            new fromPostActions.GroupPostsLoaded(data, action.groupId)
        ),
        catchError(error => {
          console.error("Error", error);
          return of(error);
        })
      );
    })
  );

  @Effect()
  createPost = this.actions.ofType(fromPostActions.CREATE_POST).pipe(
    switchMap((action: fromPostActions.CreatePost) => {
      return this.postsService
        .createPost(action.groupId, action.payload)
        .pipe(
          map((response: any) => response.data),
          map(data => new fromPostActions.PostCreated(data, action.groupId))
        );
    })
  );

  @Effect()
  loadPostComments = this.actions
    .ofType(fromPostActions.LOAD_POST_COMMENTS)
    .pipe(
      map((action: fromPostActions.LoadPostComments) => action),
      switchMap(action => {
        return this.postsService.getPostComments(action.postId).pipe(
          map((response: any) => response.data),
          map(
            (data: any) =>
              new fromPostActions.PostCommentsLoaded(data, action.postId)
          ),
          catchError(error => {
            console.error("Error", error);
            return of(error);
          })
        );
      })
    );

  @Effect()
  createComment = this.actions.ofType(fromPostActions.CREATE_COMMENT).pipe(
    switchMap((action: fromPostActions.CreateComment) => {
      return this.postsService
        .createComment(action.postId, action.payload)
        .pipe(
          map((response: any) => response.data),
          map(data => new fromPostActions.CommentCreated(data, action.postId))
        );
    })
  );

  constructor(private actions: Actions, private postsService: PostsService) {}
}
