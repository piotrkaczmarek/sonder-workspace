import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Person } from "../../models";
import { Store } from "@ngrx/store";
import { PartiesState, getPartyApplicantsEntities } from "../../+state/parties.interfaces";

@Component({
  selector: 'applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
  applicants$: Observable<Array<Person>>

  constructor(private store: Store<PartiesState>) { }

  ngOnInit() {
    this.applicants$ = this.store.select(getPartyApplicantsEntities);
  }
}
