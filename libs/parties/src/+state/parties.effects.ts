import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import {PartiesState} from './parties.interfaces';
import * as fromPartiesAction from './parties.actions';

@Injectable()
export class PartiesEffects {
  @Effect() loadData = this.dataPersistence.fetch(fromPartiesAction.LOAD_SUGGESTED_PARTIES, {
    run: (action: fromPartiesAction.LoadSuggestedParties, state: PartiesState) => {
      return {
        type: fromPartiesAction.SUGGESTED_PARTIES_LOADED,
        payload: {}
      };
    },

    onError: (action: fromPartiesAction.LoadSuggestedParties, error) => {
      console.error('Error', error);
    }
  });

  constructor(private actions: Actions, private dataPersistence: DataPersistence<PartiesState>) {}
}
