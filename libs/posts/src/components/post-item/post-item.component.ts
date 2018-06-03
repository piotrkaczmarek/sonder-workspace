import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { Post } from "../../models";
import * as postsStore from "../../+state";

@Component({
  selector: "post-item",
  templateUrl: "./post-item.component.html",
  styleUrls: ["./post-item.component.css"]
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  constructor(private store: Store<postsStore.PostsState>) {}

  ngOnInit() {}

  upvote() {
    if (this.post.voted > 0) {
      this.store.dispatch(new postsStore.RevokePostVote(this.post.id))
    } else {
      this.store.dispatch(new postsStore.UpvotePost(this.post.id));
    }
  }

  downvote() {
    if (this.post.voted < 0) {
      this.store.dispatch(new postsStore.RevokePostVote(this.post.id));
    } else {
      this.store.dispatch(new postsStore.DownvotePost(this.post.id));
    }
  }
}
