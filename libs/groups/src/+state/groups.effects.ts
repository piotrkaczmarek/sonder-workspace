import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
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
  loadSuggestedGroups = this.actions
    .ofType(fromGroupsActions.LOAD_SUGGESTED_GROUPS)
    .pipe(
      map((action: fromGroupsActions.LoadSuggestedGroups) => action),
      switchMap(() => {
        return this.groupsService.getSuggestedGroups().pipe(
          map((response: any) => response.data),
          map((data: any) => new fromGroupsActions.SuggestedGroupsLoaded(data)),
          catchError(error => {
            console.error("Error", error);
            return of(error);
          })
        );
      })
    );

  @Effect()
  loadAcceptedGroups = this.actions
    .ofType(fromGroupsActions.LOAD_ACCEPTED_GROUPS)
    .pipe(
      map((action: fromGroupsActions.LoadAcceptedGroups) => action),
      switchMap(() => {
        return this.groupsService.getAcceptedGroups().pipe(
          map((response: any) => response.data),
          map((data: any) => new fromGroupsActions.AcceptedGroupsLoaded(data)),
          catchError(error => {
            console.error("Error", error);
            return of(error);
          })
        );
      })
    );

  @Effect()
  createGroup = this.actions.ofType(fromGroupsActions.CREATE_GROUP).pipe(
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
  groupCreated = this.actions.ofType(fromGroupsActions.GROUP_CREATED).pipe(
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
  applyToGroup = this.actions.ofType(fromGroupsActions.APPLY_TO_GROUP).pipe(
    map((action: fromGroupsActions.ApplyToGroup) => action),
    map(action => action.payload),
    switchMap(groupId => {
      return this.groupsService.applyToGroup(groupId).pipe(
        map((response: any) => response.data),
        map((data: any) => new fromGroupsActions.GroupAppliedTo(data)),
        catchError(error => {
          console.error("Error", error);
          return of(error);
        })
      );
    })
  );

  @Effect()
  dismissGroup = this.actions.ofType(fromGroupsActions.DISMISS_GROUP).pipe(
    map((action: fromGroupsActions.DismissGroup) => action.payload),
    switchMap(groupId => {
      return this.groupsService
        .dismissGroup(groupId)
        .pipe(map(data => new fromGroupsActions.GroupDismissed(groupId)));
    })
  );

  @Effect()
  acceptApplicant = this.actions
    .ofType(fromGroupsActions.ACCEPT_APPLICANT)
    .pipe(
      map((action: fromGroupsActions.AcceptApplicant) => action.payload),
      switchMap(payload => {
        return this.groupsService
          .acceptApplicant(payload.groupId, payload.applicantId)
          .pipe(map(data => new fromGroupsActions.ApplicantAccepted(payload)));
      })
    );

  @Effect()
  rejectApplicant = this.actions
    .ofType(fromGroupsActions.REJECT_APPLICANT)
    .pipe(
      map((action: fromGroupsActions.RejectApplicant) => action.payload),
      switchMap(payload => {
        return this.groupsService
          .rejectApplicant(payload.groupId, payload.applicantId)
          .pipe(map(data => new fromGroupsActions.ApplicantRejected(payload)));
      })
    );

  @Effect()
  leaveGroup = this.actions.ofType(fromGroupsActions.LEAVE_GROUP).pipe(
    map((action: fromGroupsActions.LeaveGroup) => action.payload),
    switchMap(groupId => {
      return this.groupsService
        .dismissGroup(groupId)
        .pipe(map(data => new fromGroupsActions.GroupLeft(groupId)));
    })
  );

  @Effect()
  loadApplicants = this.actions.ofType(fromGroupsActions.LOAD_APPLICANTS).pipe(
    map((action: fromGroupsActions.LoadApplicants) => action),
    switchMap(action => {
      return this.groupsService.getApplicants(action.groupId).pipe(
        map((response: any) => response.data),
        map(
          (data: any) =>
            new fromGroupsActions.ApplicantsLoaded(data, action.groupId)
        ),
        catchError(error => {
          console.error("Error", error);
          return of(error);
        })
      );
    })
  );

  @Effect()
  loadFeed = this.actions.ofType(fromGroupsActions.LOAD_FEED).pipe(
    map((action: fromGroupsActions.LoadFeed) => action),
    switchMap(action => {
      return this.feedService
        .getFeed(action.groupId)
        .pipe(
          map((response: any) => response.data),
          map(
            (data: any) =>
              new fromGroupsActions.FeedLoaded(data, action.groupId)
          ),
          catchError(error => {
            console.error("Error", error);
            return of(error);
          })
        );
    })
  );

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
    private groupsService: GroupsService,
    private feedService: FeedService,
    private store: Store<GroupsState>
  ) {}
}
