import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";

import { Post, Comment } from "../models";
import { BACKEND_SERVICE, BackendService } from "@sonder-workspace/auth";
import { switchMap } from "rxjs/operators/switchMap";

@Injectable()
export class PostsService {
  private backend: BackendService;

  constructor(@Inject(BACKEND_SERVICE) backend) {
    this.backend = backend;
  }

  getGroupPosts(groupId: number): Observable<any> {
    return this.backend
      .get(`/groups/${groupId}/posts`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  getPostComments(postId: number): Observable<any> {
    return this.backend
      .get(`/posts/${postId}`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  createPost(groupId: number, post: Post): Observable<Post> {
    return this.backend
      .post(`/groups/${groupId}/posts`, { post })
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  createComment(postId: number, comment: Comment): Observable<Comment> {
    return this.backend
      .post(`/posts/${postId}/comments`, { comment })
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  upvote(targetClass: string, targetId: number) {
    return this.backend.post(`/${targetClass}/${targetId}/upvote`, {});
  }

  downvote(targetClass: string, targetId: number) {
    return this.backend.post(`/${targetClass}/${targetId}/downvote`, {});
  }

  revoke_vote(targetClass: string, targetId: number) {
    return this.backend.post(`/${targetClass}/${targetId}/revoke_vote`, {});
  }
}
