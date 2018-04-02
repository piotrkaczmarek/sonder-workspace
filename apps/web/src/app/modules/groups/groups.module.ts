import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { groupsReducer, groupsInitialState, GroupsEffects } from "./+state";

import {
  AcceptedGroupsLoadedGuard,
  SuggestedGroupsLoadedGuard,
  ApplicantsLoadedGuard,
  FeedLoadedGuard
} from "./guards";

import { GroupsService, FeedService } from './services';
import { AuthenticatedGuard } from "@sonder-workspace/auth";
import { AppBackendService as BackendService } from "../auth/services";

import {
  SuggestedGroupItemComponent,
  AcceptedGroupItemComponent,
  NewGroupPageComponent,
  AcceptedGroupsComponent,
  SuggestedGroupsComponent,
  AcceptedGroupShowComponent,
  ApplicantsComponent,
  GroupFeedComponent,
  NewPostFormComponent,
  PostItemComponent
} from "./components";

import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

export const groupsRoutes: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "suggested" },
  {
    path: "new",
    canActivate: [AuthenticatedGuard],
    component: NewGroupPageComponent
  },
  {
    path: "suggested",
    canActivate: [AuthenticatedGuard, SuggestedGroupsLoadedGuard],
    component: SuggestedGroupsComponent
  },
  {
    path: "accepted",
    canActivate: [AuthenticatedGuard, AcceptedGroupsLoadedGuard],
    component: AcceptedGroupsComponent
  },
  {
    path: "accepted/:groupId",
    canActivate: [AuthenticatedGuard, AcceptedGroupsLoadedGuard, FeedLoadedGuard],
    component: AcceptedGroupShowComponent
  },
  {
    path: "accepted/:groupId/applicants",
    canActivate: [AuthenticatedGuard, AcceptedGroupsLoadedGuard, ApplicantsLoadedGuard],
    component: ApplicantsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature("groups", groupsReducer, {
      initialState: groupsInitialState
    }),
    EffectsModule.forFeature([GroupsEffects])
  ],
  declarations: [
    NewGroupPageComponent,
    SuggestedGroupsComponent,
    SuggestedGroupItemComponent,
    AcceptedGroupsComponent,
    AcceptedGroupItemComponent,
    AcceptedGroupShowComponent,
    ApplicantsComponent,
    GroupFeedComponent,
    NewPostFormComponent,
    PostItemComponent
  ],
  providers: [
    GroupsEffects,
    SuggestedGroupsLoadedGuard,
    AcceptedGroupsLoadedGuard,
    ApplicantsLoadedGuard,
    FeedLoadedGuard,
    GroupsService,
    FeedService,
    AuthenticatedGuard,
    BackendService
  ]
})
export class GroupsModule {}
