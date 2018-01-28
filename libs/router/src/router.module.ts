import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './+state/router.effects';

@NgModule({
  imports: [CommonModule,
    EffectsModule.forFeature([RouterEffects])],
  providers: [RouterEffects]
})
export class AppRouterModule {
}
