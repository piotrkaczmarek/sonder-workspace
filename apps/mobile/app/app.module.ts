// angular
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';


import { StoreModule, MetaReducer, ActionReducer } from "@ngrx/store";
import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterStateSerializer
} from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";

// app
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from "./modules/auth/auth.module";
import { GroupsModule } from "./modules/groups/groups.module";
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    CoreModule,
    SharedModule,
    AuthModule,
    GroupsModule,
    AppRoutingModule,
    StoreModule.forRoot(
      { router: routerReducer },
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router"
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
