import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { partiesReducer, partiesInitialState, SubsEffects } from "./+state";

import { AcceptedSubsLoadedGuard, SuggestedSubsLoadedGuard, ApplicantsLoadedGuard } from "./guards";

import { SubsService } from './services/parties.service';
import { AuthenticatedGuard, BackendService } from "@sonder-workspace/auth";

import {
  SuggestedPartyItemComponent,
  AcceptedPartyItemComponent,
  NewPartyPageComponent,
  AcceptedSubsComponent,
  SuggestedSubsComponent,
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
    canActivate: [AuthenticatedGuard, SuggestedSubsLoadedGuard],
    component: SuggestedSubsComponent
  },
  {
    path: "accepted",
    canActivate: [AuthenticatedGuard, AcceptedSubsLoadedGuard],
    component: AcceptedSubsComponent
  },
  {
    path: "accepted/:partyId",
    canActivate: [AuthenticatedGuard, AcceptedSubsLoadedGuard],
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
    EffectsModule.forFeature([SubsEffects])
  ],
  declarations: [
    NewPartyPageComponent,
    SuggestedSubsComponent,
    SuggestedPartyItemComponent,
    AcceptedSubsComponent,
    AcceptedPartyItemComponent,
    AcceptedPartyShowComponent,
    ApplicantsComponent
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
