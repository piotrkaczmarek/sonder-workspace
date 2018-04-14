import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";
import {
  GroupsState,
  getGroupPostsEntities
} from "../../+state/groups.interfaces";

@Component({
  selector: "group-posts",
  templateUrl: "./group-posts.component.html",
  styleUrls: ["./group-posts.component.css"]
})
export class GroupPostsComponent implements OnInit {
  public groupPosts$: Observable<any>;
  public groupId: number;

  constructor(private store: Store<GroupsState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.groupPosts$ = this.store.select(getGroupPostsEntities);
    this.route.paramMap.subscribe(route => (this.groupId = parseInt(route["params"].groupId, 10)));
  }
}
