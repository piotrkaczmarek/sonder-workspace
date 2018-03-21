import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { SubsState } from "../../+state/parties.interfaces";
import * as fromSubsActions from "../../+state/parties.actions";

@Component({
  selector: "app-suggested-party-item",
  templateUrl: "./suggested-party-item.component.html",
  styleUrls: ["./suggested-party-item.component.css"]
})
export class SuggestedSubItemComponent implements OnInit {
  @Input() party: any;
  constructor(private store: Store<SubsState>) {}

  ngOnInit() {}

  applyToSub() {
    this.store.dispatch(new fromSubsActions.ApplyToSub(this.party.id));
  }

  dismissSub() {
    this.store.dispatch(new fromSubsActions.DismissSub(this.party.id));
  }
}
