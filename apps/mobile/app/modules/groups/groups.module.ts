import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Route } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import {
  groupsReducer,
  groupsInitialState,
  GroupsEffects
} from "@sonder-workspace/groups";

import {
  AcceptedGroupsLoadedGuard,
  SuggestedGroupsLoadedGuard,
  ApplicantsLoadedGuard,
  FeedLoadedGuard
} from "@sonder-workspace/groups";

import { GroupsService, FeedService } from "@sonder-workspace/groups";
import { AuthenticatedGuard } from "@sonder-workspace/auth";
import { AppBackendService } from "../auth/services";

import { AcceptedGroupsComponent } from "./components"

import { BACKEND_SERVICE } from "@sonder-workspace/auth";

export const groupsRoutes: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "accepted" },
  {
    path: "accepted",
    canActivate: [AuthenticatedGuard, AcceptedGroupsLoadedGuard],
    component: AcceptedGroupsComponent
  },
];

import { SharedModule } from "../shared/shared.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NativeScriptRouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature("groups", groupsReducer, {
      initialState: groupsInitialState
    }),
    EffectsModule.forFeature([GroupsEffects])
  ],
  declarations: [
    AcceptedGroupsComponent
  ],
  providers: [
    GroupsEffects,
    SuggestedGroupsLoadedGuard,
    AcceptedGroupsLoadedGuard,
    ApplicantsLoadedGuard,
    FeedLoadedGuard,
    GroupsService,
    FeedService,
    AuthenticatedGuard
  ]
})
export class GroupsModule {}
