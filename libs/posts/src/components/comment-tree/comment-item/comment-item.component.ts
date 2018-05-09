import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { Comment } from "../../../models";
import * as postsStore from "../../../+state";

@Component({
  selector: "comment-item",
  templateUrl: "./comment-item.component.html",
  styleUrls: ["./comment-item.component.css"]
})
export class CommentItemComponent implements OnInit {
  @Input() body: string;
  @Input() postId: number;
  @Input() voted: number;
  @Input() commentId: number;
  @Input() parentIds: Array<number>;

  expanded: boolean;
  commentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<postsStore.PostsState>
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      body: ["", Validators.required]
    });
  }

  postComment() {
    const payload = {
      ...this.commentForm.getRawValue(),
      ...{
        parent_ids: this.parentIds
      }
    }
    this.store.dispatch(new postsStore.CreateComment(payload, this.postId));
    this.expanded = false;
    this.commentForm.reset();
  }
}
