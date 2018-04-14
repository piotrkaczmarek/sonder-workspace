// angular
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// nativescript
import { NativeScriptRouterModule } from 'nativescript-angular/router';

// app
import { SharedModule } from './modules/shared/shared.module';
import { authRoutes } from "./modules/auth/auth.module";
import { groupsRoutes } from "./modules/groups/groups.module";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "groups", children: groupsRoutes },
  { path: "login", children: authRoutes }
];

@NgModule({
  imports: [SharedModule, NativeScriptRouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
