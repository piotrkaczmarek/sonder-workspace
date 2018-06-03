import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators"
import { combineLatest } from "rxjs/observable/combineLatest";
import { ActivatedRoute } from "@angular/router";

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
  groupRequiredError = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<PostsState>,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.createForm();
    this.groups$ = this.store.select(getAcceptedGroupsEntities);

    const groupId$ = this.route.paramMap.pipe(
      map(route => route["params"].groupId),
      map((groupId: string) => parseInt(groupId, 10))
    )
    combineLatest(this.groups$, groupId$).subscribe(([groups, groupId]) => {
      if (groupId) {
        this.postForm.controls.groupId.setValue(groupId);
      }
    });
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: ["", Validators.required],
      body: [""],
      groupId: ["", Validators.required]
    });
  }

  onPostButtonClick() {
    if (!this.postForm.valid) {
      this.groupRequiredError = true;
      return;
    }
    const { groupId, ...postAttrs } = this.postForm.getRawValue();
    this.store.dispatch(new CreatePost(postAttrs, groupId));
    this.location.back(); // TODO: prevent to navigating away from app when url is pasted
  }
}
