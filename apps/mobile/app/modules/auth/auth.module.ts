import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
// nativescript
import { NativeScriptRouterModule } from 'nativescript-angular/router';

// app
import { SharedModule } from '../shared/shared.module';
import { COMPONENTS, LoginPageComponent } from './components';

import {
  authReducer,
  AuthEffects,
  authInitialState,
  AuthService,
  BackendService,
  AuthenticatedGuard
} from "@sonder-workspace/auth";
// import { AuthService } from "./services/auth.service";

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    NativeScriptRouterModule.forChild(routes),
    StoreModule.forFeature("auth", authReducer, {
      initialState: authInitialState
    }),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [...COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    AuthEffects,
    AuthService,
    BackendService /*FacebookService*/,
    AuthenticatedGuard
  ]
})
export class AuthModule {}
