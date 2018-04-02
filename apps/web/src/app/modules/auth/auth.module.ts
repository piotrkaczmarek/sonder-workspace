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
  UnauthenticatedGuard
} from "@sonder-workspace/auth";
import { AuthService, AppBackendService } from "./services";
import { AuthEffects } from "./+state/auth.effects";

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
    AppBackendService,
    AuthEffects,
    AuthService,
    FacebookService,
    AuthenticatedGuard,
    UnauthenticatedGuard
  ]
})
export class AuthModule {}
