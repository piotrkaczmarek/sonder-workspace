import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import * as postsStore from "../../../+state";

@Component({
  selector: "post-vote-buttons",
  templateUrl: "./post-vote-buttons.component.html",
  styleUrls: ["./post-vote-buttons.component.css"]
})
export class PostVoteButtonsComponent implements OnInit {
  @Input() postId: number;
  @Input() voted: number;
  @Input() points: number;

  constructor(private store: Store<postsStore.PostsState>) {}

  ngOnInit() {}

  upvote() {
    if (this.voted > 0) {
      this.store.dispatch(new postsStore.RevokePostVote(this.postId));
    } else {
      this.store.dispatch(new postsStore.UpvotePost(this.postId));
    }
  }

  downvote() {
    if (this.voted < 0) {
      this.store.dispatch(new postsStore.RevokePostVote(this.postId));
    } else {
      this.store.dispatch(new postsStore.DownvotePost(this.postId));
    }
  }
}
