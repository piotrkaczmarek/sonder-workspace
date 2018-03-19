import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule, Route } from '@angular/router';
// import { partiesRoutes, PartiesModule } from '@sonder-workspace/parties';
import { StoreModule, MetaReducer, ActionReducer } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './+state/app.reducer';
import { appInitialState } from './+state/app.init';
import { AppEffects } from './+state/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from '@ngrx/router-store';
// import { authRoutes, AuthModule } from '@sonder-workspace/auth';
import { authRoutes, AuthModule } from './modules/auth/auth.module';
import { AppRouterModule, CustomSerializer } from "@sonder-workspace/router";
import { localStorageSync } from "ngrx-store-localstorage";

const routes: Route[] = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", children: authRoutes },
  // { path: "parties", children: partiesRoutes }
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
    // PartiesModule,
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
