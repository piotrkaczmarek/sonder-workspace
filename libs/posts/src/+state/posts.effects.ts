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
  loadPost = this.actions.ofType(fromPostActions.LOAD_POST).pipe(
    map((action: fromPostActions.LoadPost) => action),
    switchMap(action => {
      return this.postsService.getPost(action.postId).pipe(
        map((response: any) => response.data),
        map((data: any) => new fromPostActions.PostLoaded(data, action.postId)),
        catchError(error => {
          console.error("Error", error);
          return of(error);
        })
      )
    })
  )

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

  @Effect()
  upvoteComment = this.actions.ofType(fromPostActions.UPVOTE_COMMENT).pipe(
    switchMap((action: fromPostActions.UpvoteComment) => {
      return this.postsService
        .upvote('comments', action.commentId)
        .pipe(
          map((response: any) => response.data),
          map(
            data =>
              new fromPostActions.CommentUpvoted(
                action.commentId,
                action.postId
              )
          )
        );
    })
  );

  @Effect()
  downvoteComment = this.actions.ofType(fromPostActions.DOWNVOTE_COMMENT).pipe(
    switchMap((action: fromPostActions.DownvoteComment) => {
      return this.postsService
        .downvote('comments', action.commentId)
        .pipe(
          map((response: any) => response.data),
          map(
            data =>
              new fromPostActions.CommentDownvoted(
                action.commentId,
                action.postId
              )
          )
        );
    })
  );

  @Effect()
  revokeCommentVote = this.actions.ofType(fromPostActions.REVOKE_COMMENT_VOTE).pipe(
    switchMap((action: fromPostActions.RevokeCommentVote) => {
      return this.postsService
        .revokeVote('comments', action.commentId)
        .pipe(
          map((response: any) => response.data),
          map(data => new fromPostActions.CommentVoteRevoked(action.commentId, action.postId))
        )
    })
  )

  @Effect()
  upvotePost = this.actions.ofType(fromPostActions.UPVOTE_POST).pipe(
    switchMap((action: fromPostActions.UpvotePost) => {
      return this.postsService
        .upvote('posts', action.postId)
        .pipe(
          map((response: any) => response.data),
          map(
            data =>
              new fromPostActions.PostUpvoted(
                action.postId
              )
          )
        );
    })
  );

  @Effect()
  downvotePost = this.actions.ofType(fromPostActions.DOWNVOTE_POST).pipe(
    switchMap((action: fromPostActions.DownvotePost) => {
      return this.postsService
        .downvote('posts', action.postId)
        .pipe(
          map((response: any) => response.data),
          map(data => new fromPostActions.PostDownvoted(action.postId))
        );
    })
  );

  @Effect()
  revokePostVote = this.actions.ofType(fromPostActions.REVOKE_POST_VOTE).pipe(
    switchMap((action: fromPostActions.RevokePostVote) => {
      return this.postsService
        .revokeVote('posts', action.postId)
        .pipe(
          map((response: any) => response.data),
          map(data => new fromPostActions.PostVoteRevoked(action.postId))
        )
    })
  )
  constructor(private actions: Actions, private postsService: PostsService) {}
}
