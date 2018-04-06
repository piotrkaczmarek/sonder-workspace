import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";

import { Profile } from "../models";
import { AppBackendService as BackendService } from "../../auth/services";
import { switchMap } from "rxjs/operators/switchMap";

@Injectable()
export class ProfilesService {
  constructor(private backend: BackendService) {}

  getMyProfile() {
    return this.backend
      .get("/profiles/me")
      .pipe(catchError((error: any) => Observable.throw(error)));
  }
}
