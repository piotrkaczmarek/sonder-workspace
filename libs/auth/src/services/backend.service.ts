import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { AuthState, getAccessToken} from '../+state/auth.interfaces';
import { switchMap } from "rxjs/operators/switchMap";
import { map, catchError } from "rxjs/operators";
import { AuthenticationFailed } from '../+state/auth.actions';

@Injectable()
export class BackendService {
  constructor(private http: HttpClient, private store: Store<AuthState>) {}

  get(path: string) {
    return this.store.select(getAccessToken).pipe(
      switchMap((accessToken) => {
        return this.http.get(this.url(path), this.headers(accessToken)).pipe(
          catchError((error: any) => {
            if(error.status === '401') {
              this.store.dispatch(new AuthenticationFailed());
            }
            return Observable.throw(error);
          })
        );
      })
    );
  }

  authenticate(accessToken: string) {
    return this.http
      .post(
        this.url("/authenticate"),
        { access_token: accessToken },
        this.staticHeaders()
      )
      .pipe(
        map((response: any) => response.data),
        catchError(error => Observable.throw(error.json()))
      );
  }

  private url(path) {
    return `${this.apiRoot()}${path}`;
  }

  private apiRoot(): string {
    return 'http://0.0.0.0:4000/api';
  }

  private staticHeaders() {
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    };
  }
  private headers(accessToken: string) {
    return {
      headers: {
        ...this.staticHeaders().headers,
        Authorization: accessToken
      }
    };
  }
}
