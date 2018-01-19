import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SuggestedPartiesComponent } from './suggested-parties/suggested-parties.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { partiesReducer } from './+state/parties.reducer';
import { partiesInitialState } from './+state/parties.init';
import { PartiesEffects } from './+state/parties.effects';

export const partiesRoutes: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "suggested" },
  { path: "suggested", component: SuggestedPartiesComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule, StoreModule.forFeature('parties', partiesReducer, {initialState: partiesInitialState}), EffectsModule.forFeature([PartiesEffects])],
  declarations: [SuggestedPartiesComponent],
  providers: [PartiesEffects]
})
export class PartiesModule {
}
