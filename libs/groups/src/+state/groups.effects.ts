import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import {GroupsState} from './groups.interfaces';
import { GroupsService, FeedService } from '../services';
import * as fromGroupsActions from './groups.actions';
import { Store } from "@ngrx/store";
import * as fromAppRouter from "@sonder-workspace/router";

@Injectable()
export class GroupsEffects {
  @Effect()
  loadSuggestedGroups = this.dataPersistence.fetch(
    fromGroupsActions.LOAD_SUGGESTED_PARTIES,
    {
      run: (action: fromGroupsActions.LoadSuggestedGroups, state: GroupsState) => {
        return this.groupsService
          .getSuggestedGroups()
          .pipe(
            map((response: any) => response.data),
            map((data: any) => new fromGroupsActions.SuggestedGroupsLoaded(data))
          );
      },

      onError: (action: fromGroupsActions.LoadSuggestedGroups, error) => {
        console.error("Error", error);
      }
    }
  );

  @Effect()
  loadAcceptedGroups = this.dataPersistence.fetch(
    fromGroupsActions.LOAD_ACCEPTED_PARTIES,
    {
      run: (action: fromGroupsActions.LoadAcceptedGroups, state: GroupsState) => {
        return this.groupsService
          .getAcceptedGroups()
          .pipe(
            map((response: any) => response.data),
            map((data: any) => new fromGroupsActions.AcceptedGroupsLoaded(data))
          );
      },

      onError: (action: fromGroupsActions.LoadAcceptedGroups, error) => {
        console.error("Error", error);
      }
    }
  );

  @Effect()
  createGroup = this.actions.ofType(fromGroupsActions.CREATE_PARTY).pipe(
    map((action: fromGroupsActions.CreateGroup) => action.payload),
    switchMap(groupAttributes => {
      return this.groupsService
        .createGroup(groupAttributes)
        .pipe(
          map((response: any) => response.data),
          map(data => new fromGroupsActions.GroupCreated(data))
        );
    })
  );

  @Effect({ dispatch: false })
  groupCreated = this.actions.ofType(fromGroupsActions.PARTY_CREATED).pipe(
    map((action: fromGroupsActions.GroupCreated) => action.payload),
    tap(({ path, query: queryParams, extras }) =>
      this.store.dispatch(
        new fromAppRouter.Go({
          path: ["groups/accepted"]
        })
      )
    )
  );

  @Effect()
  applyToGroup = this.dataPersistence.pessimisticUpdate(
    fromGroupsActions.APPLY_TO_PARTY,
    {
      run: (action: fromGroupsActions.ApplyToGroup, state: GroupsState) => {
        return this.groupsService
          .applyToGroup(action.payload)
          .pipe(
            map((data: any) => new fromGroupsActions.GroupAppliedTo(action.payload))
          );
      },

      onError: (action: fromGroupsActions.ApplyToGroup, error) => {
        console.error("Error", error);
      }
    }
  );

  @Effect()
  dismissGroup = this.actions.ofType(fromGroupsActions.DISMISS_PARTY).pipe(
    map((action: fromGroupsActions.DismissGroup) => action.payload),
    switchMap(groupId => {
      return this.groupsService
        .dismissGroup(groupId)
        .pipe(map(data => new fromGroupsActions.GroupDismissed(groupId)));
    })
  );

  @Effect()
  acceptApplicant = this.actions.ofType(fromGroupsActions.ACCEPT_APPLICANT).pipe(
    map((action: fromGroupsActions.AcceptApplicant) => action.payload),
    switchMap(payload => {
      return this.groupsService
        .acceptApplicant(payload.groupId, payload.applicantId)
        .pipe(map(data => new fromGroupsActions.ApplicantAccepted(payload)));
    })
  );

  @Effect()
  rejectApplicant = this.actions.ofType(fromGroupsActions.REJECT_APPLICANT).pipe(
    map((action: fromGroupsActions.RejectApplicant) => action.payload),
    switchMap(payload => {
      return this.groupsService
        .rejectApplicant(payload.groupId, payload.applicantId)
        .pipe(map(data => new fromGroupsActions.ApplicantRejected(payload)));
    })
  );

  @Effect()
  leaveGroup = this.actions.ofType(fromGroupsActions.LEAVE_PARTY).pipe(
    map((action: fromGroupsActions.LeaveGroup) => action.payload),
    switchMap(groupId => {
      return this.groupsService
        .dismissGroup(groupId)
        .pipe(map(data => new fromGroupsActions.GroupLeft(groupId)));
    })
  );

  @Effect()
  loadApplicants = this.dataPersistence.fetch(fromGroupsActions.LOAD_APPLICANTS, {
    run: (action: fromGroupsActions.LoadApplicants, state: GroupsState) => {
      return this.groupsService
        .getApplicants(action.groupId)
        .pipe(
          map((response: any) => response.data),
          map(
            (data: any) =>
              new fromGroupsActions.ApplicantsLoaded(data, action.groupId)
          )
        );
    },

    onError: (action: fromGroupsActions.LoadApplicants, error) => {
      console.error("Error", error);
    }
  });

  @Effect()
  loadFeed = this.dataPersistence.fetch(fromGroupsActions.LOAD_FEED, {
    run: (action: fromGroupsActions.LoadFeed, state: GroupsState) => {
      return this.feedService
        .getFeed(action.groupId)
        .pipe(
          map((response: any) => response.data),
          map((data: any) => new fromGroupsActions.FeedLoaded(data, action.groupId))
        );
    },
    onError: (action: fromGroupsActions.LoadFeed, error) => {
      console.error("Error", error);
    }
  });

  @Effect()
  createPost = this.actions.ofType(fromGroupsActions.CREATE_POST).pipe(
    switchMap((action: fromGroupsActions.CreatePost) => {
      return this.feedService
        .createPost(action.groupId, action.payload)
        .pipe(
          map((response: any) => response.data),
          map(data => new fromGroupsActions.PostCreated(data, action.groupId))
        );
    })
  );

  constructor(
    private actions: Actions,
    private dataPersistence: DataPersistence<GroupsState>,
    private groupsService: GroupsService,
    private feedService: FeedService,
    private store: Store<GroupsState>
  ) {}
}
