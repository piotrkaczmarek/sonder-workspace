import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { SuggestedPartiesComponent } from './suggested-parties/suggested-parties.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { partiesReducer } from './+state/parties.reducer';
import { partiesInitialState } from './+state/parties.init';
import { PartiesEffects } from './+state/parties.effects';
import { PartyItemComponent } from './party-item/party-item.component';
import { SuggestedPartiesGuard } from "./guards/suggested-parties.guard";
import { PartiesService } from './services/parties.service';
import { AuthenticatedGuard, BackendService } from "@sonder-workspace/auth";
import { NewPartyPageComponent } from './new-party-page/new-party-page.component';
import { AcceptedPartiesComponent } from './accepted-parties/accepted-parties.component';

export const partiesRoutes: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "suggested" },
  {
    path: "suggested",
    canActivate: [AuthenticatedGuard, SuggestedPartiesGuard],
    component: SuggestedPartiesComponent
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
  declarations: [SuggestedPartiesComponent, PartyItemComponent, NewPartyPageComponent, AcceptedPartiesComponent],
  providers: [
    PartiesEffects,
    SuggestedPartiesGuard,
    PartiesService,
    AuthenticatedGuard,
    BackendService
  ]
})
export class PartiesModule {}
