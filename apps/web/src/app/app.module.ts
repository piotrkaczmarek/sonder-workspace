import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NxModule } from '@nrwl/nx';
import { RouterModule, Route } from '@angular/router';

import { StoreModule, MetaReducer, ActionReducer } from "@ngrx/store";
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { appReducer } from './+state/app.reducer';
import { appInitialState } from './+state/app.init';
import { AppEffects } from './+state/app.effects';
import { LOGGED_OUT } from "@sonder-workspace/auth";

import { environment } from '../environments/environment';
import { localStorageSync } from "ngrx-store-localstorage";

import { groupsRoutes, GroupsModule } from "./modules/groups/groups.module";
import { postsRoutes, PostsModule } from "./modules/posts/posts.module";
import { AppRouterModule, CustomSerializer } from "@sonder-workspace/router";
import { authRoutes, AuthModule } from './modules/auth/auth.module';
import { profilesRoutes, ProfilesModule } from "./modules/profiles/profiles.module";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";

const routes: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "groups" },
  { path: "login", children: authRoutes },
  { path: "groups", children: groupsRoutes },
  { path: "posts", children: postsRoutes },
  { path: "profiles", children: profilesRoutes }
];

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    if (action.type === LOGGED_OUT) {
      return reducer(undefined, action);
    }
    return reducer(state, action);
  };
}

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ["auth"], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
  clearState
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: "enabled" }),
    AuthModule,
    PostsModule,
    GroupsModule,
    ProfilesModule,
    AppRouterModule,
    StoreModule.forRoot(
      { app: appReducer, router: routerReducer },
      { metaReducers }
    ),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      stateKey: "router"
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    AppEffects,
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ]
})
export class AppModule {}
