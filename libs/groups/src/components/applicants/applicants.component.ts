import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";
import { Person } from "../../models";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { GroupsState, getGroupApplicantsEntities } from "../../+state/groups.interfaces";
import * as fromGroupsActions from "../../+state/groups.actions";

@Component({
  selector: 'applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
  applicants$: Observable<Array<Person>>
  groupId: number

  constructor(private store: Store<GroupsState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.applicants$ = this.store.select(getGroupApplicantsEntities);
    this.route.paramMap.subscribe(route => this.groupId = parseInt(route["params"].groupId, 10))
  }

  acceptApplicant(applicantId) {
    const payload = { groupId: this.groupId, applicantId: applicantId };
    this.store.dispatch(new fromGroupsActions.AcceptApplicant(payload));
  }

  rejectApplicant(applicantId) {
    const payload = { groupId: this.groupId, applicantId: applicantId };
    this.store.dispatch(new fromGroupsActions.RejectApplicant(payload));
  }
}
