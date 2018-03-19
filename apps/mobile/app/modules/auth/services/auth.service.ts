import { Injectable } from "@angular/core";
import { OnInit } from "@angular/core";
// import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { map, catchError, switchMap } from "rxjs/operators";
// import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';
import { of } from "rxjs/observable/of";

import * as tnsOAuthModule from "nativescript-oauth";

@Injectable()
export class AuthService implements OnInit {
  constructor(/*private http: HttpClient, private facebookService: FacebookService*/) {
    // const params: InitParams = {
    //   version: 'v2.10',
    //   appId: '897988177030305'
    // };
    // facebookService.init(params);
  }

  ngOnInit() {
    const facebookInitOptions: tnsOAuthModule.ITnsOAuthOptionsFacebook = {
      clientId: "897988177030305",
      clientSecret: "bbd78c3b3bff9ae668fd24ad55fffef7",
      scope: ["public_profile", "email"]
    };
    tnsOAuthModule.initFacebook(facebookInitOptions);
  }

  facebookLogIn(): Observable<any> {
        // this.clearData.apply(this);
        // let userDataObservable = Observable.fromPromise(tnsOAuthModule.ensureValidToken())
        //   .flatMap(accessToken => this.authenticateBackend(accessToken))
        //   .flatMap(user => this.onLoginSuccess.apply(this, [user]));
        // userDataObservable.catch(error => this.clearData.apply(this));
        // return userDataObservable;

    return fromPromise(tnsOAuthModule.ensureValidToken()).pipe(
      map((response) => {
        debugger;
      })
    )

    // return of("123");
    // return fromPromise(this.facebookService.getLoginStatus()).pipe(
    //   switchMap(data => data['status'] === "connected" ? of(data) : fromPromise(this.facebookService.login())),
    //   map(data => data['authResponse'].accessToken), catchError(
    //       (error: any) => Observable.throw(error.json())
    //     )
    // );
  }
}
