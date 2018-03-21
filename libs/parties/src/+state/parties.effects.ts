import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import {SubsState} from './parties.interfaces';
import { SubsService } from '../services/parties.service';
import * as fromSubsActions from './parties.actions';
import { Store } from "@ngrx/store";
import * as fromAppRouter from "@sonder-workspace/router";

@Injectable()
export class SubsEffects {
  @Effect()
  loadSuggestedSubs = this.dataPersistence.fetch(
    fromSubsActions.LOAD_SUGGESTED_PARTIES,
    {
      run: (
        action: fromSubsActions.LoadSuggestedSubs,
        state: SubsState
      ) => {
        return this.partiesService
          .getSuggestedSubs()
          .pipe(
            map((response: any) => response.data),
            map(
              (data: any) => new fromSubsActions.SuggestedSubsLoaded(data)
            )
          );
      },

      onError: (action: fromSubsActions.LoadSuggestedSubs, error) => {
        console.error("Error", error);
      }
    }
  );

  @Effect()
  loadAcceptedSubs = this.dataPersistence.fetch(
    fromSubsActions.LOAD_ACCEPTED_PARTIES,
    {
      run: (
        action: fromSubsActions.LoadAcceptedSubs,
        state: SubsState
      ) => {
        return this.partiesService
          .getAcceptedSubs()
          .pipe(
            map((response: any) => response.data),
            map(
              (data: any) => new fromSubsActions.AcceptedSubsLoaded(data)
            )
          );
      },

      onError: (action: fromSubsActions.LoadAcceptedSubs, error) => {
        console.error("Error", error);
      }
    }
  );

  @Effect()
  createParty = this.actions.ofType(fromSubsActions.CREATE_PARTY).pipe(
    map((action: fromSubsActions.CreateParty) => action.payload),
    switchMap(partyAttributes => {
      return this.partiesService
        .createParty(partyAttributes)
        .pipe(
        map((response: any) => response.data),
        map(data => new fromSubsActions.PartyCreated(data))
        );
    })
  );

  @Effect({ dispatch: false })
  partyCreated = this.actions.ofType(fromSubsActions.PARTY_CREATED).pipe(
    map((action: fromSubsActions.PartyCreated) => action.payload),
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
    fromSubsActions.APPLY_TO_PARTY,
    {
      run: (action: fromSubsActions.ApplyToParty, state: SubsState) => {
        return this.partiesService
          .applyToParty(action.payload)
          .pipe(
            map(
              (data: any) =>
                new fromSubsActions.PartyAppliedTo(action.payload)
            )
          );
      },

      onError: (action: fromSubsActions.ApplyToParty, error) => {
        console.error("Error", error);
      }
    }
  );

  @Effect()
  dismissParty = this.actions.ofType(fromSubsActions.DISMISS_PARTY).pipe(
    map((action: fromSubsActions.DismissParty) => action.payload),
    switchMap(partyId => {
      return this.partiesService
        .dismissParty(partyId)
        .pipe(
        map(data => new fromSubsActions.PartyDismissed(partyId))
        );
    })
  );

  @Effect()
  acceptApplicant = this.actions.ofType(fromSubsActions.ACCEPT_APPLICANT).pipe(
    map((action: fromSubsActions.AcceptApplicant) => action.payload),
    switchMap(payload => {
      return this.partiesService
        .acceptApplicant(payload.partyId, payload.applicantId)
        .pipe(
        map(data => new fromSubsActions.ApplicantAccepted(payload))
        );
    })
  );

  @Effect()
  rejectApplicant = this.actions.ofType(fromSubsActions.REJECT_APPLICANT).pipe(
    map((action: fromSubsActions.RejectApplicant) => action.payload),
    switchMap((payload) => {
      return this.partiesService
        .rejectApplicant(payload.partyId, payload.applicantId)
        .pipe(
        map(data => new fromSubsActions.ApplicantRejected(payload))
        );
    })
  );

  @Effect()
  leaveParty = this.actions.ofType(fromSubsActions.LEAVE_PARTY).pipe(
    map((action: fromSubsActions.LeaveParty) => action.payload),
    switchMap(partyId => {
      return this.partiesService
        .dismissParty(partyId)
        .pipe(
        map(data => new fromSubsActions.PartyLeft(partyId))
        );
    })
  );


  @Effect()
  loadApplicants = this.dataPersistence.fetch(
    fromSubsActions.LOAD_APPLICANTS,
    {
      run: (
        action: fromSubsActions.LoadApplicants,
        state: SubsState
      ) => {
        return this.partiesService
          .getApplicants(action.partyId)
          .pipe(
          map((response: any) => response.data),
          map(
            (data: any) => new fromSubsActions.ApplicantsLoaded(data, action.partyId)
          )
          );
      },

      onError: (action: fromSubsActions.LoadApplicants, error) => {
        console.error("Error", error);
      }
    }
  );

  constructor(
    private actions: Actions,
    private dataPersistence: DataPersistence<SubsState>,
    private partiesService: SubsService,
    private store: Store<SubsState>
  ) {}
}
