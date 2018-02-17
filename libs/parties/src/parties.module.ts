import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { partiesReducer, partiesInitialState, PartiesEffects } from "./+state";

import { AcceptedPartiesLoadedGuard, SuggestedPartiesLoadedGuard, ApplicantsLoadedGuard } from "./guards";

import { PartiesService } from './services/parties.service';
import { AuthenticatedGuard, BackendService } from "@sonder-workspace/auth";

import {
  SuggestedPartyItemComponent,
  AcceptedPartyItemComponent,
  NewPartyPageComponent,
  AcceptedPartiesComponent,
  SuggestedPartiesComponent,
  AcceptedPartyShowComponent,
  ApplicantsComponent
} from "./components";

export const partiesRoutes: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "suggested" },
  {
    path: "new",
    canActivate: [AuthenticatedGuard],
    component: NewPartyPageComponent
  },
  {
    path: "suggested",
    canActivate: [AuthenticatedGuard, SuggestedPartiesLoadedGuard],
    component: SuggestedPartiesComponent
  },
  {
    path: "accepted",
    canActivate: [AuthenticatedGuard, AcceptedPartiesLoadedGuard],
    component: AcceptedPartiesComponent
  },
  {
    path: "accepted/:partyId",
    canActivate: [AuthenticatedGuard, AcceptedPartiesLoadedGuard],
    component: AcceptedPartyShowComponent
  },
  {
    path: "accepted/:partyId/applicants",
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
    StoreModule.forFeature("parties", partiesReducer, {
      initialState: partiesInitialState
    }),
    EffectsModule.forFeature([PartiesEffects])
  ],
  declarations: [
    NewPartyPageComponent,
    SuggestedPartiesComponent,
    SuggestedPartyItemComponent,
    AcceptedPartiesComponent,
    AcceptedPartyItemComponent,
    AcceptedPartyShowComponent,
    ApplicantsComponent
  ],
  providers: [
    PartiesEffects,
    SuggestedPartiesLoadedGuard,
    AcceptedPartiesLoadedGuard,
    ApplicantsLoadedGuard,
    PartiesService,
    AuthenticatedGuard,
    BackendService
  ]
})
export class PartiesModule {}
