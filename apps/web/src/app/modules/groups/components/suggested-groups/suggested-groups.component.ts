import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { GroupsState, getSuggestedGroupsEntities } from "../../+state/groups.interfaces";

@Component({
  selector: 'app-suggested-groups',
  templateUrl: './suggested-groups.component.html',
  styleUrls: ['./suggested-groups.component.css']
})
export class SuggestedGroupsComponent implements OnInit {
  public suggestedGroups$: Observable<any>;

  constructor(private store: Store<GroupsState>) { }

  ngOnInit() {
    this.suggestedGroups$ = this.store.select(getSuggestedGroupsEntities);
  }
}
