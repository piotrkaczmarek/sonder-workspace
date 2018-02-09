import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { PartiesState } from "../../+state/parties.interfaces";
import * as fromPartiesActions from "../../+state/parties.actions";

@Component({
  selector: "app-accepted-party-item",
  templateUrl: "./accepted-party-item.component.html",
  styleUrls: ["./accepted-party-item.component.css"]
})
export class AcceptedPartyItemComponent implements OnInit {
  @Input() party: any;
  constructor(private store: Store<PartiesState>) {}

  ngOnInit() {}

  leaveParty() {
    this.store.dispatch(new fromPartiesActions.LeaveParty(this.party.id));
  }
}
