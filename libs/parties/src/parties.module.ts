import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { partiesReducer, partiesInitialState, PartiesEffects } from "./+state";

import { AcceptedPartiesLoadedGuard, SuggestedPartiesLoadedGuard } from "./guards";

import { PartiesService } from './services/parties.service';
import { AuthenticatedGuard, BackendService } from "@sonder-workspace/auth";

import {
  SuggestedPartyItemComponent,
  AcceptedPartyItemComponent,
  NewPartyPageComponent,
  AcceptedPartiesComponent,
  SuggestedPartiesComponent
} from "./components";
import { AcceptedPartyShowComponent } from './components/accepted-party-show/accepted-party-show.component';

export const partiesRoutes: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "suggested" },
  {
    path: "suggested",
    canActivate: [AuthenticatedGuard, SuggestedPartiesLoadedGuard],
    component: SuggestedPartiesComponent
  },
  {
    path: "accepted/:partyId",
    canActivate: [AuthenticatedGuard, AcceptedPartiesLoadedGuard],
    component: AcceptedPartyShowComponent
  },
  {
    path: "accepted",
    canActivate: [AuthenticatedGuard, AcceptedPartiesLoadedGuard],
    component: AcceptedPartiesComponent
  },
  {
    path: "new",
    canActivate: [AuthenticatedGuard],
    component: NewPartyPageComponent
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
    AcceptedPartyShowComponent
  ],
  providers: [
    PartiesEffects,
    SuggestedPartiesLoadedGuard,
    AcceptedPartiesLoadedGuard,
    PartiesService,
    AuthenticatedGuard,
    BackendService
  ]
})
export class PartiesModule {}
