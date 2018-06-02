import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { PostsState } from "../../+state/posts.interfaces";
import { CreatePost } from "../../+state/posts.actions";
import {
  Group,
  getAcceptedGroupsEntities,
  GroupsState
} from "@sonder-workspace/groups";

@Component({
  selector: "new-post-form",
  templateUrl: "./new-post-form.component.html",
  styleUrls: ["./new-post-form.component.css"]
})
export class NewPostFormComponent implements OnInit {
  @Input() groupId: number;
  postForm: FormGroup;
  groups$: Observable<Array<Group>>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<PostsState>
  ) {}

  ngOnInit() {
    this.createForm();
    this.groups$ = this.store.select(getAcceptedGroupsEntities);
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: ["", Validators.required],
      body: [""],
      groupId: ["", Validators.required]
    });
  }

  onPostButtonClick() {
    if(!this.postForm.valid) { return; };
    const { groupId, ...postAttrs } = this.postForm.getRawValue();
    this.store.dispatch(new CreatePost(postAttrs, groupId));
    this.postForm.controls.body.setValue("");
    this.postForm.controls.title.setValue("");
  }
}
