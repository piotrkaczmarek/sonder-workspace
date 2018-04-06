import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Route } from "@angular/router";

import { profilesReducer } from './+state/profiles.reducer';
import { profilesInitialState } from './+state/profiles.init';
import { ProfilesEffects } from './+state/profiles.effects';
import { ProfilesService } from "./services";

import {
  AuthenticatedGuard
} from "@sonder-workspace/auth";
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MyProfileLoadedGuard } from './guards';

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
