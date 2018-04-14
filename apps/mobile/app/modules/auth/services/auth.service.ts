import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { environment } from "../../../environments/environment";

import * as tnsOAuthModule from "nativescript-oauth";

const facebookInitOptions: tnsOAuthModule.ITnsOAuthOptionsFacebook = {
  clientId: "897988177030305",
  clientSecret: "bbd78c3b3bff9ae668fd24ad55fffef7",
  scope: ["public_profile", "email"]
};

@Injectable()
export class AppAuthService {
  constructor(
  ) {
    tnsOAuthModule.initFacebook(facebookInitOptions);
  }

  facebookLogIn(): Observable<any> {
    return fromPromise(tnsOAuthModule.ensureValidToken());
  }
}
