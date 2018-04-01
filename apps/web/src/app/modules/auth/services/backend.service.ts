import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { BackendService } from "@sonder-workspace/auth";

@Injectable()
export class AppBackendService extends BackendService {
  apiRoot(): string {
    return `http://0.0.0.0:4000/api`;
  }
}
