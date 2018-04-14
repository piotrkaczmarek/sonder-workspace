import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import {
  GroupsState,
  getAcceptedGroupsEntities
} from "@sonder-workspace/groups";

@Component({
  selector: "ns-accepted-groups",
  moduleId: module.id,
  templateUrl: "./accepted-groups.component.html"
})
export class AcceptedGroupsComponent implements OnInit {
  public acceptedGroups$: Observable<any>;

  constructor(private store: Store<GroupsState>) {}

  ngOnInit() {
    this.acceptedGroups$ = this.store.select(getAcceptedGroupsEntities);
  }
}
