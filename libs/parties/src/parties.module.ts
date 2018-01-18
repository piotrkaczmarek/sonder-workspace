import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SuggestedPartiesComponent } from './suggested-parties/suggested-parties.component';

export const partiesRoutes: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "suggested" },
  { path: "suggested", component: SuggestedPartiesComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SuggestedPartiesComponent]
})
export class PartiesModule {
}
