import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
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
  @Effect({ dispatch: false })
  loadSuggestedParties = this.actions
    .ofType(fromPartiesActions.LOAD_SUGGESTED_PARTIES)
    .pipe(
      switchMap(_ => {
        return this.partiesService
          .getSuggestedParties()
          .pipe(
            map((response: any) => response.data),
            map(
              (data: any) => new fromPartiesActions.SuggestedPartiesLoaded(data)
            )
          );
      })
    );

  @Effect({ dispatch: false })
  loadAcceptedParties = this.actions
    .ofType(fromPartiesActions.LOAD_ACCEPTED_PARTIES)
    .pipe(
      switchMap(_ => {
        return this.partiesService
          .getAcceptedParties()
          .pipe(
            map((response: any) => response.data),
            map(
              (data: any) => new fromPartiesActions.AcceptedPartiesLoaded(data)
            )
          );
      })
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
  applyToParty = this.actions.ofType(fromPartiesActions.APPLY_TO_PARTY).pipe(
    map((action: fromPartiesActions.ApplyToParty) => action.payload),
    switchMap(partyId => {
      return this.partiesService
        .applyToParty(partyId)
        .pipe(map(data => new fromPartiesActions.PartyAppliedTo(partyId)));
    })
  );

  @Effect()
  dismissParty = this.actions.ofType(fromPartiesActions.DISMISS_PARTY).pipe(
    map((action: fromPartiesActions.DismissParty) => action.payload),
    switchMap(partyId => {
      return this.partiesService
        .dismissParty(partyId)
        .pipe(map(data => new fromPartiesActions.PartyDismissed(partyId)));
    })
  );

  @Effect()
  acceptApplicant = this.actions
    .ofType(fromPartiesActions.ACCEPT_APPLICANT)
    .pipe(
      map((action: fromPartiesActions.AcceptApplicant) => action.payload),
      switchMap(payload => {
        return this.partiesService
          .acceptApplicant(payload.partyId, payload.applicantId)
          .pipe(map(data => new fromPartiesActions.ApplicantAccepted(payload)));
      })
    );

  @Effect()
  rejectApplicant = this.actions
    .ofType(fromPartiesActions.REJECT_APPLICANT)
    .pipe(
      map((action: fromPartiesActions.RejectApplicant) => action.payload),
      switchMap(payload => {
        return this.partiesService
          .rejectApplicant(payload.partyId, payload.applicantId)
          .pipe(map(data => new fromPartiesActions.ApplicantRejected(payload)));
      })
    );

  @Effect()
  leaveParty = this.actions.ofType(fromPartiesActions.LEAVE_PARTY).pipe(
    map((action: fromPartiesActions.LeaveParty) => action.payload),
    switchMap(partyId => {
      return this.partiesService
        .dismissParty(partyId)
        .pipe(map(data => new fromPartiesActions.PartyLeft(partyId)));
    })
  );

  @Effect()
  loadApplicants = this.actions.ofType(fromPartiesActions.LOAD_APPLICANTS).pipe(
    map((action: fromPartiesActions.LoadApplicants) => action.payload),
    switchMap(partyId => {
      return this.partiesService
        .getApplicants(partyId)
        .pipe(
          map(data => new fromPartiesActions.ApplicantsLoaded(data, partyId))
        );
    })
  );

  constructor(
    private actions: Actions,
    private partiesService: PartiesService,
    private store: Store<PartiesState>
  ) {}
}
