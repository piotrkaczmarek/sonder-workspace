import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import * as postsStore from "../../+state";
import { Observable } from 'rxjs/Observable';
import { Comment } from "../../models";

@Component({
  selector: "comment-tree",
  templateUrl: "./comment-tree.component.html",
  styleUrls: ["./comment-tree.component.css"]
})
export class CommentTreeComponent implements OnInit {
  @Input() postId: number;
  @Input() parentIds: Array<number>;

  comments$: Observable<Array<Comment>>;

  constructor(private store: Store<postsStore.PostsState>) {}

  ngOnInit() {
    this.comments$ = this.store.select(
      postsStore.getPostCommentsChildren(this.postId, this.parentIds)
    );
  }
}
