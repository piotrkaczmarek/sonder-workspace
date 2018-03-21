import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Sub } from '../models/sub.model';
import { BackendService } from "@sonder-workspace/auth";
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class SubsService {
  constructor(private http: HttpClient, private backend: BackendService) {}

  getSuggestedSubs(): Observable<any> {
    return this.backend
      .get("/parties/suggested")
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  getAcceptedSubs(): Observable<any> {
    return this.backend
      .get("/parties/accepted")
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  createSub(sub: Sub): Observable<Sub> {
    return this.backend
      .post("/parties", { sub })
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  applyToSub(subId: number): Observable<any> {
    return this.backend
      .put(`/parties/${subId}/apply`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  dismissSub(subId: number): Observable<any> {
    return this.backend
      .put(`/parties/${subId}/dismiss`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  getApplicants(subId: number): Observable<any> {
    return this.backend
      .get(`/parties/${subId}/applicants`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  acceptApplicant(subId: number, applicantId: number) {
    return this.backend
      .put(`/parties/${subId}/applicants/${applicantId}/accept`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  rejectApplicant(subId: number, applicantId: number) {
    return this.backend
      .put(`/parties/${subId}/applicants/${applicantId}/reject`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }
  // updateSub(payload: Sub): Observable<Sub> {
  //   return this.http
  //     .put<Sub>(`/api/pizzas/${payload.id}`, payload)
  //     .pipe(catchError((error: any) => Observable.throw(error.json())));
  // }

  // removeSub(payload: Sub): Observable<Sub> {
  //   return this.http
  //     .delete<any>(`/api/pizzas/${payload.id}`)
  //     .pipe(catchError((error: any) => Observable.throw(error.json())));
  // }
}
