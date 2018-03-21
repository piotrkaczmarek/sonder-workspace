import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Sub } from '../models/party.model';
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

  createSub(party: Sub): Observable<Sub> {
    return this.backend
      .post("/parties", { party })
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  applyToSub(partyId: number): Observable<any> {
    return this.backend
      .put(`/parties/${partyId}/apply`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  dismissSub(partyId: number): Observable<any> {
    return this.backend
      .put(`/parties/${partyId}/dismiss`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  getApplicants(partyId: number): Observable<any> {
    return this.backend
      .get(`/parties/${partyId}/applicants`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  acceptApplicant(partyId: number, applicantId: number) {
    return this.backend
      .put(`/parties/${partyId}/applicants/${applicantId}/accept`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  rejectApplicant(partyId: number, applicantId: number) {
    return this.backend
      .put(`/parties/${partyId}/applicants/${applicantId}/reject`)
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
