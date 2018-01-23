import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { map, switchMap, catchError } from 'rxjs/operators';
import {PartiesState} from './parties.interfaces';
import { PartiesService } from '../services/parties.service';
import * as fromPartiesAction from './parties.actions';

@Injectable()
export class PartiesEffects {
  @Effect() loadData = this.dataPersistence.fetch(fromPartiesAction.LOAD_SUGGESTED_PARTIES, {
    run: (action: fromPartiesAction.LoadSuggestedParties, state: PartiesState) => {
      return this.partiesService
                 .getParties()
                 .pipe(
                   map((response: any) => response.data),
                   map((data: any) => new fromPartiesAction.SuggestedPartiesLoaded(data))
                  );
    },

    onError: (action: fromPartiesAction.LoadSuggestedParties, error) => {
      console.error('Error', error);
    }
  });

  constructor(private actions: Actions, private dataPersistence: DataPersistence<PartiesState>, private partiesService: PartiesService) {}
}
