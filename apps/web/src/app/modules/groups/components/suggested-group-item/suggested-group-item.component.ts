import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { GroupsState } from "../../+state/groups.interfaces";
import * as fromGroupsActions from "../../+state/groups.actions";

@Component({
  selector: "app-suggested-group-item",
  templateUrl: "./suggested-group-item.component.html",
  styleUrls: ["./suggested-group-item.component.css"]
})
export class SuggestedGroupItemComponent implements OnInit {
  @Input() group: any;
  constructor(private store: Store<GroupsState>) {}

  ngOnInit() {}

  applyToGroup() {
    this.store.dispatch(new fromGroupsActions.ApplyToGroup(this.group.id));
  }

  dismissGroup() {
    this.store.dispatch(new fromGroupsActions.DismissGroup(this.group.id));
  }
}
