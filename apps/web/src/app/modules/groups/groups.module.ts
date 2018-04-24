import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppBackendService } from "../auth/services";

import {
  components,
  NewGroupPageComponent,
  AcceptedGroupsComponent,
  SuggestedGroupsComponent,
  AcceptedGroupShowComponent,
  ApplicantsComponent,
  groupsReducer,
  groupsInitialState,
  GroupsEffects,
  AcceptedGroupsLoadedGuard,
  SuggestedGroupsLoadedGuard,
  ApplicantsLoadedGuard,
  GroupsService
} from "@sonder-workspace/groups";

import {
  GroupPostsLoadedGuard
} from "@sonder-workspace/posts";


import { PostsModule } from "../posts/posts.module";
import { AuthenticatedGuard, BACKEND_SERVICE } from "@sonder-workspace/auth";

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
    canActivate: [AuthenticatedGuard, AcceptedGroupsLoadedGuard, GroupPostsLoadedGuard],
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
    PostsModule,
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
    ...components,
    NewGroupPageComponent,
    SuggestedGroupsComponent,
    AcceptedGroupsComponent,
    AcceptedGroupShowComponent,
    ApplicantsComponent,
  ],
  providers: [
    GroupsEffects,
    SuggestedGroupsLoadedGuard,
    AcceptedGroupsLoadedGuard,
    ApplicantsLoadedGuard,
    GroupsService,
    AuthenticatedGuard
  ]
})
export class GroupsModule {}
