import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { GroupsState } from "../../+state/groups.interfaces";
import { CreateGroup } from "../../+state/groups.actions";

@Component({
  selector: "new-group-page",
  templateUrl: "./new-group-page.component.html",
  styleUrls: ["./new-group-page.component.css"]
})
export class NewGroupPageComponent implements OnInit {
  groupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<GroupsState>
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.groupForm = this.formBuilder.group({
      name: ["", Validators.required],
      size: [5, [Validators.min(2), Validators.max(10)]]
    });
  }

  onCreateButtonClick() {
    this.store.dispatch(new CreateGroup(this.groupForm.getRawValue()));
  }
}
