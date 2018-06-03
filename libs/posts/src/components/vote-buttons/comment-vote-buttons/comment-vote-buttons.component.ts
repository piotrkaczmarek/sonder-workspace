import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import * as postsStore from "../../../+state";

@Component({
  selector: "comment-vote-buttons",
  templateUrl: "./comment-vote-buttons.component.html",
  styleUrls: ["./comment-vote-buttons.component.css"]
})
export class CommentVoteButtonsComponent implements OnInit {
  @Input() postId: number;
  @Input() commentId: number;
  @Input() points: number;
  @Input() voted: number;

  constructor(private store: Store<postsStore.PostsState>) {}

  ngOnInit() {}

  upvote() {
    if (this.voted > 0) {
      this.store.dispatch(new postsStore.RevokeCommentVote(this.commentId, this.postId));
    } else {
      this.store.dispatch(new postsStore.UpvoteComment(this.commentId, this.postId));
    }
  }

  downvote() {
    if (this.voted < 0) {
      this.store.dispatch(new postsStore.RevokeCommentVote(this.commentId, this.postId));
    } else {
      this.store.dispatch(new postsStore.DownvoteComment(this.commentId, this.postId));
    }
  }
}
