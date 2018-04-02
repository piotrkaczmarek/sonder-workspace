import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Route } from "@angular/router";

import { profilesReducer } from './+state/profiles.reducer';
import { profilesInitialState } from './+state/profiles.init';
import { ProfilesEffects } from './+state/profiles.effects';

import {
  AuthenticatedGuard
} from "@sonder-workspace/auth";

export const profilesRoutes: Route[] = [
  {
    path: "my",
    pathMatch: "full",
    component: MyProfileComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('profiles', profilesReducer, {initialState: profilesInitialState}),
    EffectsModule.forFeature([ProfilesEffects])
  ],
  declarations: [],
  providers: [ProfilesEffects]
})
export class ProfilesModule { }
