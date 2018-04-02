import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { AuthState, getLoggedIn } from "@sonder-workspace/auth";
import { LogOut } from "@sonder-workspace/auth";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public loggedIn$: Observable<boolean>;

  constructor(private store: Store<AuthState>) {}

  ngOnInit() {
    this.loggedIn$ = this.store.select(getLoggedIn);
  }

  logOut() {
    this.store.dispatch(new LogOut());
  }
}
