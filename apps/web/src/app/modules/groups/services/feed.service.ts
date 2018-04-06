import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Post } from "../models";
import { AppBackendService as BackendService } from "../../auth/services";
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class FeedService {
  constructor(private backend: BackendService) {}

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
