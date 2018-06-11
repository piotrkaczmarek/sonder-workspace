import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Comment } from "../../../models";
import { NewCommentFormComponent } from "../../new-comment-form/new-comment-form.component";

@Component({
  selector: "comment-item",
  templateUrl: "./comment-item.component.html",
  styleUrls: ["./comment-item.component.css"]
})
export class CommentItemComponent implements OnInit {
  @Input() comment: Comment;
  @Input() postId: number;

  selected = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openNewCommentDialog() {
    const dialogRef = this.dialog.open(NewCommentFormComponent, {
      data: { comment: this.comment, postId: this.postId }
    });
    this.selected = true;
    dialogRef.afterClosed().subscribe(() => this.selected = false);
  }
}
