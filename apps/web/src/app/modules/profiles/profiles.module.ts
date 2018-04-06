import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Route } from "@angular/router";

import {
  profilesReducer,
  profilesInitialState,
  ProfilesEffects,
  ProfilesService,
  MyProfileComponent,
  MyProfileLoadedGuard
} from "@sonder-workspace/profiles";
import {
  AuthenticatedGuard
} from "@sonder-workspace/auth";

export const profilesRoutes: Route[] = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "me"
  },
  {
    path: "me",
    component: MyProfileComponent,
    canActivate: [AuthenticatedGuard, MyProfileLoadedGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("profiles", profilesReducer, {
      initialState: profilesInitialState
    }),
    EffectsModule.forFeature([ProfilesEffects])
  ],
  declarations: [MyProfileComponent],
  providers: [ProfilesEffects, ProfilesService, MyProfileLoadedGuard]
})
export class ProfilesModule {}
