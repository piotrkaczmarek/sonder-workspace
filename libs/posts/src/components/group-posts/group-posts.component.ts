import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";
import {
  PostsState,
  getGroupPostsEntities
} from "../../+state/posts.interfaces";
import { map, filter } from 'rxjs/operators';

@Component({
  selector: "group-posts",
  templateUrl: "./group-posts.component.html",
  styleUrls: ["./group-posts.component.css"]
})
export class GroupPostsComponent implements OnInit {
  public groupPosts$: Observable<any>;
  public groupId$: Observable<number>;

  constructor(
    private store: Store<PostsState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.groupPosts$ = this.store.select(getGroupPostsEntities).pipe(
      filter(posts => posts ? true : false),
      map((posts) => posts.sort((a, b) => b.points - a.points))
    );
    this.groupId$ = this.route.paramMap.pipe(
      map(route => route["params"].groupId),
      map((groupId: string) => parseInt(groupId, 10))
    )
  }
}
