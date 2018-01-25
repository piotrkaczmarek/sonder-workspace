import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, catchError } from 'rxjs/operators';
import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private facebookService: FacebookService) {
    const params: InitParams = {
      version: 'v2.10',
      appId: '897988177030305'
    };
    facebookService.init(params);
  }

  facebookLogIn(): Observable<any> {
    return fromPromise(this.facebookService.login())
            .pipe(
              map(data => data.authResponse.accessToken),
              catchError((error: any) => Observable.throw(error.json()))
            )
  }

  authenticateBackend(accessToken): Observable<any> {
    return this.http
      .post(
        'http://0.0.0.0:4000/api/authenticate',
        { access_token: accessToken },
        { headers: this.backendHeaders()}
      ).pipe(
        map((response: any) => response.data),
        catchError((error: any) => Observable.throw(error.json()))
      )
  }


  private backendHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }
}
