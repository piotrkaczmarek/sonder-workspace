import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { map, switchMap, catchError } from "rxjs/operators";
import { FacebookService, InitParams, AuthResponse } from "ngx-facebook";
import { of } from "rxjs/observable/of";
import { environment } from "../../../environments/environment";

@Injectable()
export class AppAuthService {
  constructor(
    private http: HttpClient,
    private facebookService: FacebookService
  ) {
    const params: InitParams = {
      version: "v2.10",
      appId: environment.facebookAppId
    };
    facebookService.init(params);
  }

  facebookLogIn(): Observable<any> {
    return fromPromise(this.facebookService.getLoginStatus())
      .pipe(
        switchMap(
        data =>
          data.status === "connected"
            ? of(data)
            : fromPromise(this.facebookService.login())
        ),
        map(data => data.authResponse.accessToken),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }
}
