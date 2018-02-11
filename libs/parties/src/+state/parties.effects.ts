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
  loadSuggestedParties = this.dataPersistence.fetch(
    fromPartiesActions.LOAD_SUGGESTED_PARTIES,
    {
      run: (
        action: fromPartiesActions.LoadSuggestedParties,
        state: PartiesState
      ) => {
        return this.partiesService
          .getSuggestedParties()
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
  loadAcceptedParties = this.dataPersistence.fetch(
    fromPartiesActions.LOAD_ACCEPTED_PARTIES,
    {
      run: (
        action: fromPartiesActions.LoadAcceptedParties,
        state: PartiesState
      ) => {
        return this.partiesService
          .getAcceptedParties()
          .pipe(
            map((response: any) => response.data),
            map(
              (data: any) => new fromPartiesActions.AcceptedPartiesLoaded(data)
            )
          );
      },

      onError: (action: fromPartiesActions.LoadAcceptedParties, error) => {
        console.error("Error", error);
      }
    }
  );

  @Effect()
  createParty = this.actions.ofType(fromPartiesActions.CREATE_PARTY).pipe(
    map((action: fromPartiesActions.CreateParty) => action.payload),
    switchMap(partyAttributes => {
      return this.partiesService
        .createParty(partyAttributes)
        .pipe(
        map((response: any) => response.data),
        map(data => new fromPartiesActions.PartyCreated(data))
        );
    })
  );

  @Effect({ dispatch: false })
  partyCreated = this.actions.ofType(fromPartiesActions.PARTY_CREATED).pipe(
    map((action: fromPartiesActions.PartyCreated) => action.payload),
    tap(({ path, query: queryParams, extras }) =>
      this.store.dispatch(
        new fromAppRouter.Go({
          path: ["parties/accepted"]
        })
      )
    )
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
  dismissParty = this.actions.ofType(fromPartiesActions.DISMISS_PARTY).pipe(
    map((action: fromPartiesActions.DismissParty) => action.payload),
    switchMap(partyId => {
      return this.partiesService
        .dismissParty(partyId)
        .pipe(
        map(data => new fromPartiesActions.PartyDismissed(partyId))
        );
    })
  );

  @Effect()
  leaveParty = this.actions.ofType(fromPartiesActions.LEAVE_PARTY).pipe(
    map((action: fromPartiesActions.LeaveParty) => action.payload),
    switchMap(partyId => {
      return this.partiesService
        .dismissParty(partyId)
        .pipe(
        map(data => new fromPartiesActions.PartyLeft(partyId))
        );
    })
  );


  @Effect()
  loadApplicants = this.dataPersistence.fetch(
    fromPartiesActions.LOAD_APPLICANTS,
    {
      run: (
        action: fromPartiesActions.LoadApplicants,
        state: PartiesState
      ) => {
        return this.partiesService
          .getApplicants(action.partyId)
          .pipe(
          map((response: any) => response.data),
          map(
            (data: any) => new fromPartiesActions.ApplicantsLoaded(data, action.partyId)
          )
          );
      },

      onError: (action: fromPartiesActions.LoadApplicants, error) => {
        console.error("Error", error);
      }
    }
  );

  constructor(
    private actions: Actions,
    private dataPersistence: DataPersistence<PartiesState>,
    private partiesService: PartiesService,
    private store: Store<PartiesState>
  ) {}
}
