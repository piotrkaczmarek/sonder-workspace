import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { SubsState } from "../../+state/parties.interfaces";
import * as fromSubsActions from "../../+state/parties.actions";

@Component({
  selector: "app-suggested-party-item",
  templateUrl: "./suggested-party-item.component.html",
  styleUrls: ["./suggested-party-item.component.css"]
})
export class SuggestedPartyItemComponent implements OnInit {
  @Input() party: any;
  constructor(private store: Store<SubsState>) {}

  ngOnInit() {}

  applyToParty() {
    this.store.dispatch(new fromSubsActions.ApplyToParty(this.party.id));
  }

  dismissParty() {
    this.store.dispatch(new fromSubsActions.DismissParty(this.party.id));
  }
}
