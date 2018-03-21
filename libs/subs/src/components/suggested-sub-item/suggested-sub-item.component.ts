import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { SubsState } from "../../+state/subs.interfaces";
import * as fromSubsActions from "../../+state/subs.actions";

@Component({
  selector: "app-suggested-sub-item",
  templateUrl: "./suggested-sub-item.component.html",
  styleUrls: ["./suggested-sub-item.component.css"]
})
export class SuggestedSubItemComponent implements OnInit {
  @Input() sub: any;
  constructor(private store: Store<SubsState>) {}

  ngOnInit() {}

  applyToSub() {
    this.store.dispatch(new fromSubsActions.ApplyToSub(this.sub.id));
  }

  dismissSub() {
    this.store.dispatch(new fromSubsActions.DismissSub(this.sub.id));
  }
}
