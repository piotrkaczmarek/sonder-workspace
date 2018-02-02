import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Party } from '../models/party.model';
import { Store } from "@ngrx/store";
import {
  AuthState,
  getAccessToken,
  BackendService
} from "@sonder-workspace/auth";
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class PartiesService {
  constructor(private http: HttpClient, private store: Store<AuthState>, private backend: BackendService) {}

  getParties(): Observable<any> {
    return this.backend
      .get("/parties")
      .pipe(catchError((error: any) => Observable.throw(error)));;
  }

  createParty(party: Party): Observable<Party> {
    return this.backend
      .post("/parties", { party })
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  applyToParty(partyId: number): Observable<Party> {
    return this.backend
      .put(`/parties/${partyId}/apply`)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }

  // updateParty(payload: Party): Observable<Party> {
  //   return this.http
  //     .put<Party>(`/api/pizzas/${payload.id}`, payload)
  //     .pipe(catchError((error: any) => Observable.throw(error.json())));
  // }

  // removeParty(payload: Party): Observable<Party> {
  //   return this.http
  //     .delete<any>(`/api/pizzas/${payload.id}`)
  //     .pipe(catchError((error: any) => Observable.throw(error.json())));
  // }
}
