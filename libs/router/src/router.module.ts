import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from './+state/router.reducer';
import { routerInitialState } from './+state/router.init';
import { RouterEffects } from './+state/router.effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('router', routerReducer, {initialState: routerInitialState}), EffectsModule.forFeature([RouterEffects])],
  providers: [RouterEffects]
})
export class RouterModule {
}
