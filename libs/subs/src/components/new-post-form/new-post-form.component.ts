import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { SubsState } from "../../+state/subs.interfaces";
import { CreatePost } from "../../+state/subs.actions";

@Component({
  selector: "new-post-form",
  templateUrl: "./new-post-form.component.html",
  styleUrls: ["./new-post-form.component.css"]
})
export class NewPostFormComponent implements OnInit {
  @Input() subId: number;
  postForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<SubsState>
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
    this.store.dispatch(new CreatePost(this.postForm.getRawValue(), this.subId));
    this.postForm.controls.body.setValue("");
  }
}
