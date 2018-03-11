// angular
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

// libs
// import { AuthModule } from '@sonder-workspace/auth';

// app
import { CoreModule } from './modules/core/core.module';
import { AuthModule } from "./modules/auth/auth.module";
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { StoreModule, MetaReducer, ActionReducer } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { appReducer } from "./+state/app.reducer";
import { appInitialState } from "./+state/app.init";
import { AppEffects } from "./+state/app.effects";
// import { StoreDevtoolsModule } from "@ngrx/store-devtools";
// import { localStorageSync } from "ngrx-store-localstorage";

// export function localStorageSyncReducer(
//   reducer: ActionReducer<any>
// ): ActionReducer<any> {
//   return localStorageSync({ keys: ["auth"], rehydrate: true })(reducer);
// }
// const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

const production = false;
@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    StoreModule.forRoot(
      { app: appReducer },
      // { metaReducers }
    ),
    EffectsModule.forRoot([AppEffects]),
    // !production ? StoreDevtoolsModule.instrument() : [],
    CoreModule,
    SharedModule,
    AuthModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    AppEffects
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
