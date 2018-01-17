import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SuggestedPartiesComponent } from './suggested-parties/suggested-parties.component';

export const partiesRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SuggestedPartiesComponent]
})
export class PartiesModule {
}
