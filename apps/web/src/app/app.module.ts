import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule, Route } from '@angular/router';
import { partiesRoutes, PartiesModule } from '@sonder-workspace/parties';

const routes: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "parties" },
  { path: "parties", children: partiesRoutes }
];


@NgModule({
  imports: [
  BrowserModule,
  NxModule.forRoot(),
  RouterModule.forRoot(routes, {initialNavigation: 'enabled'}),
  PartiesModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
