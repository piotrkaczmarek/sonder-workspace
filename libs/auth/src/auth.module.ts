import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './+state/auth.reducer';
import { authInitialState } from './+state/auth.init';
import { AuthEffects } from './+state/auth.effects';

export const authRoutes: Route[] = [
  {
    path: "",
    pathMatch: "full",
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule, StoreModule.forFeature('auth', authReducer, {initialState: authInitialState}), EffectsModule.forFeature([AuthEffects])],
  declarations: [LoginPageComponent],
  providers: [AuthEffects]
})
export class AuthModule {
}
