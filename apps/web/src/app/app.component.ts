import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { AuthState } from "@sonder-workspace/auth";
import { LogOut } from "@sonder-workspace/auth";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AuthState>) {}

  ngOnInit() {}

  logOut() {
    this.store.dispatch(new LogOut());
  }
}
