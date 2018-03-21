import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { Party } from "../../models/party.model";
import { SubsState } from "../../+state/parties.interfaces";
import * as fromSubsActions from "../../+state/parties.actions";

@Component({
  selector: "app-accepted-party-item",
  templateUrl: "./accepted-party-item.component.html",
  styleUrls: ["./accepted-party-item.component.css"]
})
export class AcceptedPartyItemComponent implements OnInit {
  @Input() party: Party;
  constructor(private store: Store<SubsState>) {}

  ngOnInit() {}

  leaveParty() {
    this.store.dispatch(new fromSubsActions.LeaveParty(this.party.id));
  }
}
