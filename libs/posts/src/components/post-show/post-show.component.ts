import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { PostsState, getSelectedPost } from "../../+state";
import { Post, Comment } from '../../models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit {
  post$: Observable<Post>;

  constructor(private store: Store<PostsState>) { }

  ngOnInit() {
    this.post$ = this.store.select(getSelectedPost);
  }
}
