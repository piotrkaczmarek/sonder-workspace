import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SuggestedPartiesComponent } from './suggested-parties/suggested-parties.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { partiesReducer } from './+state/parties.reducer';
import { partiesInitialState } from './+state/parties.init';
import { PartiesEffects } from './+state/parties.effects';
import { PartyItemComponent } from './party-item/party-item.component';
import { SuggestedPartiesGuard } from "./guards/suggested-parties.guard";
import { PartiesService } from './services/parties.service';

export const partiesRoutes: Route[] = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "suggested"
  },
  {
    path: "suggested",
    canActivate: [SuggestedPartiesGuard],
    component: SuggestedPartiesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forFeature('parties', partiesReducer, {initialState: partiesInitialState}),
    EffectsModule.forFeature([PartiesEffects])
  ],
  declarations: [SuggestedPartiesComponent, PartyItemComponent],
  providers: [PartiesEffects, SuggestedPartiesGuard, PartiesService]
})
export class PartiesModule {
}
