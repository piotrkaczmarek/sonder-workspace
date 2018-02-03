import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { PartiesState } from "../+state/parties.interfaces";
import * as fromPartiesActions from "../+state/parties.actions";

@Component({
  selector: "app-party-item",
  templateUrl: "./party-item.component.html",
  styleUrls: ["./party-item.component.css"]
})
export class PartyItemComponent implements OnInit {
  @Input() party: any;
  constructor(private store: Store<PartiesState>) {}

  ngOnInit() {}

  applyToParty() {
    this.store.dispatch(new fromPartiesActions.ApplyToParty(this.party.id));
  }

  dismissParty() {
    this.store.dispatch(new fromPartiesActions.DismissParty(this.party.id));
  }
}
