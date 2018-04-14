import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState, LogIn } from "@sonder-workspace/auth";

@Component({
  selector: "LoginPageComponent",
  moduleId: module.id,
  templateUrl: "./login-page.component.html"
})
export class LoginPageComponent implements OnInit {
  constructor(private store: Store<AuthState>) {}

  ngOnInit() {}

  logIn() {
    this.store.dispatch(new LogIn());
  }
}
