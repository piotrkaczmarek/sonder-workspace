import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Post } from "../models";
import { BackendService } from "@sonder-workspace/auth";
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class FeedService {
  constructor(private http: HttpClient, private backend: BackendService) {}

  getFeed(groupId: number): Observable<any> {
    return this.backend
      .get(`/groups/${groupId}/posts`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  createPost(groupId: number, post: Post): Observable<Post> {
    return this.backend
      .post(`/groups/${groupId}/posts`, { post })
      .pipe(catchError((error: any) => Observable.throw(error)));
  }
}
