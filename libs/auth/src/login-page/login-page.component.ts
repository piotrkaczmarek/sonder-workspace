import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../+state/auth.interfaces';
import { LogIn } from '../+state/auth.actions';

// @Component({
//   selector: 'login-page',
//   templateUrl: './login-page.component.html',
//   styleUrls: ['./login-page.component.css']
// })
export abstract class LoginPageBaseComponent implements OnInit {

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
  }

  logIn() {
    console.log("logIn from libs clicked!");
    this.store.dispatch(new LogIn);
  }
}
