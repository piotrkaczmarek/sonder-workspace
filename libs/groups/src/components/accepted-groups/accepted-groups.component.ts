import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import {
  GroupsState,
  getAcceptedGroupsEntities
} from "../../+state/groups.interfaces";

@Component({
  selector: 'accepted-groups',
  templateUrl: './accepted-groups.component.html',
  styleUrls: ['./accepted-groups.component.css']
})
export class AcceptedGroupsComponent implements OnInit {
  public acceptedGroups$: Observable<any>;

  constructor(private store: Store<GroupsState>) { }

  ngOnInit() {
    this.acceptedGroups$ = this.store.select(getAcceptedGroupsEntities);
  }

}
