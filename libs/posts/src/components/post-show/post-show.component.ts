import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import * as postsStore from "../../+state";
import { Post, Comment } from '../../models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: "post-show",
  templateUrl: "./post-show.component.html",
  styleUrls: ["./post-show.component.css"]
})
export class PostShowComponent implements OnInit {
  post$: Observable<Post>;
  commentForm: FormGroup;
  postId: number;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<postsStore.PostsState>
  ) {}

  ngOnInit() {
    this.post$ = this.store.select(postsStore.getSelectedPost);
    this.post$.subscribe((post) => {
      if(post) this.postId = post.id;
    });
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
        parent_ids: []
      }
    };
    this.store.dispatch(new postsStore.CreateComment(payload, this.postId));
    this.commentForm.reset();
  }
}
