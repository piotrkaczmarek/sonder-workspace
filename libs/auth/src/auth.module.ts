import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
} from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './+state/auth.reducer';
import { authInitialState } from './+state/auth.init';
import { AuthEffects } from './+state/auth.effects';
import { AuthService } from './services/auth.service';
import { BackendService } from "./services/backend.service";
import { FacebookService } from 'ngx-facebook';
import { AuthenticatedGuard } from "./guards/authenticated.guard";

import { MatButtonModule } from "@angular/material/button";

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import ${moduleName} in the AppModule only.`
    );
  }
}

@NgModule({
  imports: [
    CommonModule,
  //   RouterModule,
  //   MatButtonModule,
  //   StoreModule.forFeature("auth", authReducer, {
  //     initialState: authInitialState
  //   }),
  //   EffectsModule.forFeature([AuthEffects])
  ],
  // declarations: [LoginPageComponent]
})
export class AuthModule {
  static forFeature(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule : AuthModule,
      providers : [
        ...configuredProviders
      ]
    }
  }

  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    throwIfAlreadyLoaded(parentModule, 'AuthModule');
  }
}
