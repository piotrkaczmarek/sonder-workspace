import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { subsReducer, subsInitialState, SubsEffects } from "./+state";

import { AcceptedSubsLoadedGuard, SuggestedSubsLoadedGuard, ApplicantsLoadedGuard } from "./guards";

import { SubsService } from './services/subs.service';
import { AuthenticatedGuard, BackendService } from "@sonder-workspace/auth";

import {
  SuggestedSubItemComponent,
  AcceptedSubItemComponent,
  NewSubPageComponent,
  AcceptedSubsComponent,
  SuggestedSubsComponent,
  AcceptedSubShowComponent,
  ApplicantsComponent
} from "./components";
import { SubFeedComponent } from './components/sub-feed/sub-feed.component';
import { NewPostFormComponent } from './components/new-post-form/new-post-form.component';

export const subsRoutes: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "suggested" },
  {
    path: "new",
    canActivate: [AuthenticatedGuard],
    component: NewSubPageComponent
  },
  {
    path: "suggested",
    canActivate: [AuthenticatedGuard, SuggestedSubsLoadedGuard],
    component: SuggestedSubsComponent
  },
  {
    path: "accepted",
    canActivate: [AuthenticatedGuard, AcceptedSubsLoadedGuard],
    component: AcceptedSubsComponent
  },
  {
    path: "accepted/:subId",
    canActivate: [AuthenticatedGuard, AcceptedSubsLoadedGuard],
    component: AcceptedSubShowComponent
  },
  {
    path: "accepted/:subId/applicants",
    canActivate: [AuthenticatedGuard, ApplicantsLoadedGuard],
    component: ApplicantsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature("subs", subsReducer, {
      initialState: subsInitialState
    }),
    EffectsModule.forFeature([SubsEffects])
  ],
  declarations: [
    NewSubPageComponent,
    SuggestedSubsComponent,
    SuggestedSubItemComponent,
    AcceptedSubsComponent,
    AcceptedSubItemComponent,
    AcceptedSubShowComponent,
    ApplicantsComponent,
    SubFeedComponent,
    NewPostFormComponent
  ],
  providers: [
    SubsEffects,
    SuggestedSubsLoadedGuard,
    AcceptedSubsLoadedGuard,
    ApplicantsLoadedGuard,
    SubsService,
    AuthenticatedGuard,
    BackendService
  ]
})
export class SubsModule {}
