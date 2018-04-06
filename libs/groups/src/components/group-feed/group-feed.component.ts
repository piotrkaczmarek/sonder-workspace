import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";
import {
  GroupsState,
  getGroupFeedEntities
} from "../../+state/groups.interfaces";

@Component({
  selector: "group-feed",
  templateUrl: "./group-feed.component.html",
  styleUrls: ["./group-feed.component.css"]
})
export class GroupFeedComponent implements OnInit {
  public groupPosts$: Observable<any>;
  public groupId: number;

  constructor(private store: Store<GroupsState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.groupPosts$ = this.store.select(getGroupFeedEntities);
    this.route.paramMap.subscribe(route => (this.groupId = parseInt(route["params"].groupId, 10)));
  }
}
