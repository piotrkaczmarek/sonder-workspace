import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Group } from '../models/group.model';
import { BackendService } from "@sonder-workspace/auth";
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class GroupsService {
  constructor(private http: HttpClient, private backend: BackendService) {}

  getSuggestedGroups(): Observable<any> {
    return this.backend
      .get("/groups/suggested")
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  getAcceptedGroups(): Observable<any> {
    return this.backend
      .get("/groups/accepted")
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  createGroup(group: Group): Observable<Group> {
    return this.backend
      .post("/groups", { group })
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  applyToGroup(groupId: number): Observable<any> {
    return this.backend
      .put(`/groups/${groupId}/apply`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  dismissGroup(groupId: number): Observable<any> {
    return this.backend
      .put(`/groups/${groupId}/dismiss`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  getApplicants(groupId: number): Observable<any> {
    return this.backend
      .get(`/groups/${groupId}/applicants`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  acceptApplicant(groupId: number, applicantId: number) {
    return this.backend
      .put(`/groups/${groupId}/applicants/${applicantId}/accept`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  rejectApplicant(groupId: number, applicantId: number) {
    return this.backend
      .put(`/groups/${groupId}/applicants/${applicantId}/reject`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }
  // updateGroup(payload: Group): Observable<Group> {
  //   return this.http
  //     .put<Group>(`/api/pizzas/${payload.id}`, payload)
  //     .pipe(catchError((error: any) => Observable.throw(error.json())));
  // }

  // removeGroup(payload: Group): Observable<Group> {
  //   return this.http
  //     .delete<any>(`/api/pizzas/${payload.id}`)
  //     .pipe(catchError((error: any) => Observable.throw(error.json())));
  // }
}
