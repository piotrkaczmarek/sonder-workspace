import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import {of} from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';
import {AuthState} from './auth.interfaces';
import * as fromAuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  @Effect() logIn = this.dataPersistence.pessimisticUpdate(fromAuthActions.LOG_IN, {
    run: (action: fromAuthActions.LogIn, state: AuthState) => {
      return this.authService
                 .facebookLogIn()
                 .pipe(
                    map((data: any) => new fromAuthActions.FacebookAuthenticated(data))
                 );
    },

    onError: (action: fromAuthActions.LogIn, error) => {
      console.error('Error', error);
    }
  });

  @Effect() facebookAuthenticated = this.dataPersistence.pessimisticUpdate(fromAuthActions.FACEBOOK_AUTHENTICATED, {
    run: (action: fromAuthActions.LogIn, state: AuthState) => {
      return this.authService
                 .authenticateBackend(state.auth.accessToken)
                 .pipe(
                    map((data: any) => new fromAuthActions.LoggedIn(data))
                 );
    },

    onError: (action: fromAuthActions.LogIn, error) => {
      console.error('Error', error);
    }
  });

  constructor(private actions: Actions, private dataPersistence: DataPersistence<AuthState>, private authService: AuthService) {}
}
