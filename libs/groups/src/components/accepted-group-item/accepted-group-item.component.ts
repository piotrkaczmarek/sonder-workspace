import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { Group } from "../../models/group.model";
import { GroupsState } from "../../+state/groups.interfaces";
import * as fromGroupsActions from "../../+state/groups.actions";

@Component({
  selector: "app-accepted-group-item",
  templateUrl: "./accepted-group-item.component.html",
  styleUrls: ["./accepted-group-item.component.css"]
})
export class AcceptedGroupItemComponent implements OnInit {
  @Input() group: Group;
  constructor(private store: Store<GroupsState>) {}

  ngOnInit() {}

  leaveGroup() {
    this.store.dispatch(new fromGroupsActions.LeaveGroup(this.group.id));
  }
}
