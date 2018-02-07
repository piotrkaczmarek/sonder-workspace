import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { PartiesState } from "../../+state/parties.interfaces";
import * as fromPartiesActions from "../../+state/parties.actions";

@Component({
  selector: "app-suggested-party-item",
  templateUrl: "./suggested-party-item.component.html",
  styleUrls: ["./suggested-party-item.component.css"]
})
export class SuggestedPartyItemComponent implements OnInit {
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
