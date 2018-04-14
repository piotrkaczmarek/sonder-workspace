import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import { map, switchMap, catchError } from "rxjs/operators";
import {ProfilesState} from './profiles.interfaces';
import * as fromActions from './profiles.actions';
import { ProfilesService } from "../services";
import { LoadMyProfile } from './profiles.actions';

@Injectable()
export class ProfilesEffects {
  @Effect()
  LoadMyProfile = this.actions.ofType(fromActions.LOAD_MY_PROFILE).pipe(
    map((action: fromActions.LoadMyProfile) => action),
    switchMap(() => {
      return this.profilesService
        .getMyProfile()
        .pipe(
          map((data: any) => new fromActions.MyProfileLoaded(data)),
          catchError(error => {
            console.error("Error", error);
            return of(error);
          })
        );
    })
  );

  constructor(
    private actions: Actions,
    private profilesService: ProfilesService
  ) {}
}
