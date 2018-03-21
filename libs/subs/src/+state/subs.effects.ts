import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import {SubsState} from './subs.interfaces';
import { SubsService, FeedService } from '../services';
import * as fromSubsActions from './subs.actions';
import { Store } from "@ngrx/store";
import * as fromAppRouter from "@sonder-workspace/router";

@Injectable()
export class SubsEffects {
  @Effect()
  loadSuggestedSubs = this.dataPersistence.fetch(
    fromSubsActions.LOAD_SUGGESTED_PARTIES,
    {
      run: (action: fromSubsActions.LoadSuggestedSubs, state: SubsState) => {
        return this.subsService
          .getSuggestedSubs()
          .pipe(
            map((response: any) => response.data),
            map((data: any) => new fromSubsActions.SuggestedSubsLoaded(data))
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
      run: (action: fromSubsActions.LoadAcceptedSubs, state: SubsState) => {
        return this.subsService
          .getAcceptedSubs()
          .pipe(
            map((response: any) => response.data),
            map((data: any) => new fromSubsActions.AcceptedSubsLoaded(data))
          );
      },

      onError: (action: fromSubsActions.LoadAcceptedSubs, error) => {
        console.error("Error", error);
      }
    }
  );

  @Effect()
  createSub = this.actions.ofType(fromSubsActions.CREATE_PARTY).pipe(
    map((action: fromSubsActions.CreateSub) => action.payload),
    switchMap(subAttributes => {
      return this.subsService
        .createSub(subAttributes)
        .pipe(
          map((response: any) => response.data),
          map(data => new fromSubsActions.SubCreated(data))
        );
    })
  );

  @Effect({ dispatch: false })
  subCreated = this.actions.ofType(fromSubsActions.PARTY_CREATED).pipe(
    map((action: fromSubsActions.SubCreated) => action.payload),
    tap(({ path, query: queryParams, extras }) =>
      this.store.dispatch(
        new fromAppRouter.Go({
          path: ["subs/accepted"]
        })
      )
    )
  );

  @Effect()
  applyToSub = this.dataPersistence.pessimisticUpdate(
    fromSubsActions.APPLY_TO_PARTY,
    {
      run: (action: fromSubsActions.ApplyToSub, state: SubsState) => {
        return this.subsService
          .applyToSub(action.payload)
          .pipe(
            map((data: any) => new fromSubsActions.SubAppliedTo(action.payload))
          );
      },

      onError: (action: fromSubsActions.ApplyToSub, error) => {
        console.error("Error", error);
      }
    }
  );

  @Effect()
  dismissSub = this.actions.ofType(fromSubsActions.DISMISS_PARTY).pipe(
    map((action: fromSubsActions.DismissSub) => action.payload),
    switchMap(subId => {
      return this.subsService
        .dismissSub(subId)
        .pipe(map(data => new fromSubsActions.SubDismissed(subId)));
    })
  );

  @Effect()
  acceptApplicant = this.actions.ofType(fromSubsActions.ACCEPT_APPLICANT).pipe(
    map((action: fromSubsActions.AcceptApplicant) => action.payload),
    switchMap(payload => {
      return this.subsService
        .acceptApplicant(payload.subId, payload.applicantId)
        .pipe(map(data => new fromSubsActions.ApplicantAccepted(payload)));
    })
  );

  @Effect()
  rejectApplicant = this.actions.ofType(fromSubsActions.REJECT_APPLICANT).pipe(
    map((action: fromSubsActions.RejectApplicant) => action.payload),
    switchMap(payload => {
      return this.subsService
        .rejectApplicant(payload.subId, payload.applicantId)
        .pipe(map(data => new fromSubsActions.ApplicantRejected(payload)));
    })
  );

  @Effect()
  leaveSub = this.actions.ofType(fromSubsActions.LEAVE_PARTY).pipe(
    map((action: fromSubsActions.LeaveSub) => action.payload),
    switchMap(subId => {
      return this.subsService
        .dismissSub(subId)
        .pipe(map(data => new fromSubsActions.SubLeft(subId)));
    })
  );

  @Effect()
  loadApplicants = this.dataPersistence.fetch(fromSubsActions.LOAD_APPLICANTS, {
    run: (action: fromSubsActions.LoadApplicants, state: SubsState) => {
      return this.subsService
        .getApplicants(action.subId)
        .pipe(
          map((response: any) => response.data),
          map(
            (data: any) =>
              new fromSubsActions.ApplicantsLoaded(data, action.subId)
          )
        );
    },

    onError: (action: fromSubsActions.LoadApplicants, error) => {
      console.error("Error", error);
    }
  });

  @Effect()
  loadFeed = this.dataPersistence.fetch(fromSubsActions.LOAD_FEED, {
    run: (action: fromSubsActions.LoadFeed, state: SubsState) => {
      return this.feedService
        .getFeed(action.subId)
        .pipe(
          map((response: any) => response.data),
          map((data: any) => new fromSubsActions.FeedLoaded(data, action.subId))
        );
    },
    onError: (action: fromSubsActions.LoadFeed, error) => {
      console.error("Error", error);
    }
  });

  constructor(
    private actions: Actions,
    private dataPersistence: DataPersistence<SubsState>,
    private subsService: SubsService,
    private feedService: FeedService,
    private store: Store<SubsState>
  ) {}
}
