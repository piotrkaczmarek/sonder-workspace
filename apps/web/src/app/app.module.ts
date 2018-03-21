import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule, Route } from '@angular/router';
import { subsRoutes, SubsModule } from '@sonder-workspace/subs';
import { StoreModule, MetaReducer, ActionReducer } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './+state/app.reducer';
import { appInitialState } from './+state/app.init';
import { AppEffects } from './+state/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import { authRoutes, AuthModule } from '@sonder-workspace/auth';
import { AppRouterModule, CustomSerializer } from "@sonder-workspace/router";
import { localStorageSync } from "ngrx-store-localstorage";

const routes: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "subs" },
  { path: "login", children: authRoutes },
  { path: "subs", children: subsRoutes }
];

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ["auth"], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: "enabled" }),
    AuthModule,
    SubsModule,
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
