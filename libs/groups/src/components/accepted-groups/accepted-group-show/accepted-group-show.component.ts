import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from "@ngrx/store";
import { Group } from "../../../models/group.model";
import { GroupsState, getSelectedGroup } from "../../../+state/groups.interfaces";
import * as fromGroupsActions from "../../../+state/groups.actions";

@Component({
  selector: 'accepted-group-show',
  templateUrl: './accepted-group-show.component.html',
  styleUrls: ['./accepted-group-show.component.css']
})
export class AcceptedGroupShowComponent implements OnInit {
  group$: Observable<Group>

  constructor(private store: Store<GroupsState>) { }

  ngOnInit() {
    this.group$ = this.store.select(getSelectedGroup);
  }
}
