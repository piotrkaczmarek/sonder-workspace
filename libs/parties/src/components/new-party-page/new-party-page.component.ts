import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { SubsState } from "../../+state/subs.interfaces";
import { CreateSub } from "../../+state/subs.actions";

@Component({
  selector: "new-sub-page",
  templateUrl: "./new-sub-page.component.html",
  styleUrls: ["./new-sub-page.component.css"]
})
export class NewSubPageComponent implements OnInit {
  subForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<SubsState>
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.subForm = this.formBuilder.group({
      name: ["", Validators.required],
      size: [5, [Validators.min(2), Validators.max(10)]]
    });
  }

  onCreateButtonClick() {
    this.store.dispatch(new CreateSub(this.subForm.getRawValue()));
  }
}
