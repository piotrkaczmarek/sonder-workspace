import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Party } from '../models/party.model';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { Store } from "@ngrx/store";
import { AuthState, getAccessToken } from "@sonder-workspace/auth";
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class PartiesService {
  constructor(private http: HttpClient, private store: Store<AuthState>) {}

  getParties(): Observable<Party[]> {
    return this.store.select(getAccessToken).pipe(
      switchMap((accessToken) => {
        return this.http
          .get<Party[]>(`http://0.0.0.0:4000/api/parties`, {
            headers: this.headers(accessToken)
          })
          .pipe(catchError((error: any) =>
              Observable.throw(error.json())
            ));
      })
    )
  }

  // createParty(payload: Party): Observable<Party> {
  //   return this.http
  //     .post<Party>(`/api/pizzas`, payload)
  //     .pipe(catchError((error: any) => Observable.throw(error.json())));
  // }

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

  private headers(accessToken) {
    return { "Content-Type": "application/json", Accept: "application/json", Authorization: accessToken };
  }
}
