import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Party } from '../models/party.model';

@Injectable()
export class PartiesService {
  constructor(private http: HttpClient) {}

  getParties(): Observable<Party[]> {
    return this.http
      .get<Party[]>(`/api/parties`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
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
}
