import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { Store } from "@ngrx/store";
import * as postsStore from "../../+state";

@Component({
  selector: "new-comment-form",
  templateUrl: "./new-comment-form.component.html",
  styleUrls: ["./new-comment-form.component.css"]
})
export class NewCommentFormComponent implements OnInit {
  commentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<postsStore.PostsState>,
    public dialogRef: MatDialogRef<NewCommentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
        parent_ids: this.data.comment.parentIds.concat(this.data.comment.id)
      }
    };
    this.store.dispatch(
      new postsStore.CreateComment(payload, this.data.postId)
    );
    this.commentForm.reset();
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
