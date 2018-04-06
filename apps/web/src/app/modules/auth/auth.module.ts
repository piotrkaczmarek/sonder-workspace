import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Route } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { FacebookService } from "ngx-facebook";
import {
  LoginPageComponent,
  authReducer,
  authInitialState,
  AuthenticatedGuard,
  UnauthenticatedGuard,
  AuthEffects,
  AUTH_SERVICE,
  BACKEND_SERVICE
} from "@sonder-workspace/auth";
import { AppAuthService, AppBackendService } from "./services";

import { MatButtonModule } from "@angular/material/button";

export const authRoutes: Route[] = [
  {
    path: "",
    pathMatch: "full",
    component: LoginPageComponent,
    canActivate: [UnauthenticatedGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    StoreModule.forFeature("auth", authReducer, {
      initialState: authInitialState
    }),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginPageComponent],
  providers: [
    AuthEffects,
    { provide: AUTH_SERVICE, useClass: AppAuthService },
    { provide: BACKEND_SERVICE, useClass: AppBackendService },
    FacebookService,
    AuthenticatedGuard,
    UnauthenticatedGuard
  ]
})
export class AuthModule {}
