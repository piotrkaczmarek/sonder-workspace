import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import {PartiesState} from './parties.interfaces';
import { PartiesService } from '../services/parties.service';
import * as fromPartiesActions from './parties.actions';
import { Store } from "@ngrx/store";
import * as fromAppRouter from "@sonder-workspace/router";

@Injectable()
export class PartiesEffects {
  @Effect()
  loadData = this.dataPersistence.fetch(
    fromPartiesActions.LOAD_SUGGESTED_PARTIES,
    {
      run: (
        action: fromPartiesActions.LoadSuggestedParties,
        state: PartiesState
      ) => {
        return this.partiesService
          .getParties()
          .pipe(
            map((response: any) => response.data),
            map(
              (data: any) => new fromPartiesActions.SuggestedPartiesLoaded(data)
            )
          );
      },

      onError: (action: fromPartiesActions.LoadSuggestedParties, error) => {
        console.error("Error", error);
      }
    }
  );

  @Effect()
  createParty = this.dataPersistence.pessimisticUpdate(
    fromPartiesActions.CREATE_PARTY,
    {
      run: (action: fromPartiesActions.CreateParty, state: PartiesState) => {
        return this.partiesService
          .createParty(action.payload)
          .pipe(
            map((response: any) => response.data),
            map((data: any) => new fromPartiesActions.PartyCreated(data))
          );
      },

      onError: (action: fromPartiesActions.CreateParty, error) => {
        console.error("Error", error);
      }
    }
  );

  @Effect()
  applyToParty = this.dataPersistence.pessimisticUpdate(
    fromPartiesActions.APPLY_TO_PARTY,
    {
      run: (action: fromPartiesActions.ApplyToParty, state: PartiesState) => {
        return this.partiesService
          .applyToParty(action.payload)
          .pipe(
            map(
              (data: any) =>
                new fromPartiesActions.PartyAppliedTo(action.payload)
            )
          );
      },

      onError: (action: fromPartiesActions.ApplyToParty, error) => {
        console.error("Error", error);
      }
    }
  );

  @Effect()
  dismissParty = this.dataPersistence.pessimisticUpdate(
    fromPartiesActions.DISMISS_PARTY,
    {
      run: (action: fromPartiesActions.DismissParty, state: PartiesState) => {
        return this.partiesService
          .dismissParty(action.payload)
          .pipe(
            map(
              (data: any) =>
                new fromPartiesActions.PartyDismissed(action.payload)
            )
          );
      },

      onError: (action: fromPartiesActions.DismissParty, error) => {
        console.error("Error", error);
      }
    }
  );

  @Effect({ dispatch: false })
  partyCreated = this.actions.ofType(fromPartiesActions.PARTY_CREATED).pipe(
    map((action: fromPartiesActions.PartyCreated) => action.payload),
    tap(({ path, query: queryParams, extras }) =>
      this.store.dispatch(
        new fromAppRouter.Go({
          path: ["/"]
        })
      )
    )
  );

  constructor(
    private actions: Actions,
    private dataPersistence: DataPersistence<PartiesState>,
    private partiesService: PartiesService,
    private store: Store<PartiesState>
  ) {}
}
