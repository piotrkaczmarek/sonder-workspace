import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { partiesReducer } from './+state/parties.reducer';
import { partiesInitialState } from './+state/parties.init';
import { PartiesEffects } from './+state/parties.effects';

import { SuggestedPartiesLoadedGuard } from "./guards/suggested-parties-loaded.guard";
import { PartiesService } from './services/parties.service';
import { AuthenticatedGuard, BackendService } from "@sonder-workspace/auth";

import { PartyItemComponent } from "./components/party-item/party-item.component";
import { NewPartyPageComponent } from "./components/new-party-page/new-party-page.component";
import { AcceptedPartiesComponent } from "./components/accepted-parties/accepted-parties.component";
import { SuggestedPartiesComponent } from "./components/suggested-parties/suggested-parties.component";

export const partiesRoutes: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "suggested" },
  {
    path: "suggested",
    canActivate: [AuthenticatedGuard, SuggestedPartiesLoadedGuard],
    component: SuggestedPartiesComponent
  },
  {
    path: "accepted",
    canActivate: [AuthenticatedGuard],
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
    SuggestedPartiesComponent,
    PartyItemComponent,
    NewPartyPageComponent,
    AcceptedPartiesComponent
  ],
  providers: [
    PartiesEffects,
    SuggestedPartiesLoadedGuard,
    PartiesService,
    AuthenticatedGuard,
    BackendService
  ]
})
export class PartiesModule {}
