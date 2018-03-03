// angular
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// nativescript
import { NativeScriptRouterModule } from 'nativescript-angular/router';

// app
import { SharedModule } from './modules/shared/shared.module';
import { authRoutes } from "@sonder-workspace/auth";
// import { authRoutes } from "../../../libs/auth";


// import { authRoutes } from '../../libs/auth';
// import {}

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  // {
  //   path: "",
  //   redirectTo: "/items",
  //   pathMatch: "full"
  // },
  {
    path: "login",
    loadChildren: "../libs/auth/src/auth.module#AuthModule"
  },
  // {
  //   path: "login",
  //   children: authRoutes
  // },
  {
    path: "items",
    loadChildren: "./modules/items/items.module#ItemsModule"
  }
];

@NgModule({
  imports: [SharedModule, NativeScriptRouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
