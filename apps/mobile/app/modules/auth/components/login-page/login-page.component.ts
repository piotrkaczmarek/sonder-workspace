import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState, LogIn } from "@sonder-workspace/auth";

@Component({
  selector: "ns-login-page",
  moduleId: module.id,
  templateUrl: "./login-page.component.html"
})
export class LoginPageComponent implements OnInit {
  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
  }

  logIn() {
    console.log('LOG_IN')
    this.store.dispatch(new LogIn);
  }
}
