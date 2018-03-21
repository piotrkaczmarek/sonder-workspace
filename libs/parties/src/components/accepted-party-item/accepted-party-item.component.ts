import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { Sub } from "../../models/sub.model";
import { SubsState } from "../../+state/subs.interfaces";
import * as fromSubsActions from "../../+state/subs.actions";

@Component({
  selector: "app-accepted-sub-item",
  templateUrl: "./accepted-sub-item.component.html",
  styleUrls: ["./accepted-sub-item.component.css"]
})
export class AcceptedSubItemComponent implements OnInit {
  @Input() sub: Sub;
  constructor(private store: Store<SubsState>) {}

  ngOnInit() {}

  leaveSub() {
    this.store.dispatch(new fromSubsActions.LeaveSub(this.sub.id));
  }
}
