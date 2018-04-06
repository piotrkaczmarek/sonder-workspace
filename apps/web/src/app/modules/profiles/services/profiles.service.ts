import { Injectable, Inject } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";

import { Profile } from "../models";
import { BACKEND_SERVICE, BackendService } from "@sonder-workspace/auth";
import { switchMap } from "rxjs/operators/switchMap";

@Injectable()
export class ProfilesService {
  private backend: BackendService
  constructor(@Inject(BACKEND_SERVICE) backend) {
    this.backend = backend;
  }

  getMyProfile() {
    return this.backend
      .get("/profiles/me")
      .pipe(catchError((error: any) => Observable.throw(error)));
  }
}
