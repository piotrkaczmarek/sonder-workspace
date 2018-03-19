import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState } from '@sonder-workspace/auth';
import { LoginPageBaseComponent } from "@sonder-workspace/auth";

@Component({
  selector: "login-page",
  templateUrl: "./login-page.component.html"
  // styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent extends LoginPageBaseComponent {
  constructor(private store: Store<AuthState>) {
    super(store);
  }
}
