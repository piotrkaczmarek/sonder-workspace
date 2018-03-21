import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { Sub } from "../../models/party.model";
import { SubsState } from "../../+state/parties.interfaces";
import * as fromSubsActions from "../../+state/parties.actions";

@Component({
  selector: "app-accepted-party-item",
  templateUrl: "./accepted-party-item.component.html",
  styleUrls: ["./accepted-party-item.component.css"]
})
export class AcceptedSubItemComponent implements OnInit {
  @Input() party: Sub;
  constructor(private store: Store<SubsState>) {}

  ngOnInit() {}

  leaveSub() {
    this.store.dispatch(new fromSubsActions.LeaveSub(this.party.id));
  }
}
