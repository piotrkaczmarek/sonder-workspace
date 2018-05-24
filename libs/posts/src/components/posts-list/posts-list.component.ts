import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import {
  PostsState,
  getPostsEntities
} from "../../+state/posts.interfaces";
import { map, filter } from "rxjs/operators";

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  public posts$: Observable<any>;

  constructor(
    private store: Store<PostsState>
  ) { }

  ngOnInit() {
    this.posts$ = this.store.select(getPostsEntities).pipe(
      filter(posts => posts ? true : false),
      map((posts) => posts.sort((a,b) => b.points - a.points))
    );
  }

}
