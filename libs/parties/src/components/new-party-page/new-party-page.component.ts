import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { SubsState } from "../../+state/parties.interfaces";
import { CreateParty } from "../../+state/parties.actions";

@Component({
  selector: "new-party-page",
  templateUrl: "./new-party-page.component.html",
  styleUrls: ["./new-party-page.component.css"]
})
export class NewPartyPageComponent implements OnInit {
  partyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<SubsState>
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.partyForm = this.formBuilder.group({
      name: ["", Validators.required],
      size: [5, [Validators.min(2), Validators.max(10)]]
    });
  }

  onCreateButtonClick() {
    this.store.dispatch(new CreateParty(this.partyForm.getRawValue()));
  }
}
