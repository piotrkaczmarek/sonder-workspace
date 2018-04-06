import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { map } from "rxjs/operators";
import {ProfilesState} from './profiles.interfaces';
import * as fromActions from './profiles.actions';
import { ProfilesService } from "../services";
import { LoadMyProfile } from './profiles.actions';

@Injectable()
export class ProfilesEffects {
  @Effect()
  LoadMyProfile = this.dataPersistence.fetch(fromActions.LOAD_MY_PROFILE, {
    run: (action: fromActions.LoadMyProfile, state: ProfilesState) => {
      return this.profilesService
        .getMyProfile()
        .pipe(
          map((data: any) => new fromActions.MyProfileLoaded(data))
        );
    },

    onError: (action: fromActions.LoadMyProfile, error) => {
      console.error("Error", error);
    }
  });

  constructor(
    private actions: Actions,
    private dataPersistence: DataPersistence<ProfilesState>,
    private profilesService: ProfilesService
  ) {}
}
