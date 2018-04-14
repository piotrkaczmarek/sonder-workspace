import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { PostsState } from "../../../+state/posts.interfaces";
import { CreatePost } from "../../../+state/posts.actions";

@Component({
  selector: "new-post-form",
  templateUrl: "./new-post-form.component.html",
  styleUrls: ["./new-post-form.component.css"]
})
export class NewPostFormComponent implements OnInit {
  @Input() groupId: number;
  postForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<PostsState>
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      body: ["", Validators.required]
    });
  }

  onPostButtonClick() {
    this.store.dispatch(new CreatePost(this.postForm.getRawValue(), this.groupId));
    this.postForm.controls.body.setValue("");
  }
}
