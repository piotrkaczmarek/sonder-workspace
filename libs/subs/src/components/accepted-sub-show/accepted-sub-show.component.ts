import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from "@ngrx/store";
import { Sub } from "../../models/sub.model";
import { SubsState, getSelectedAcceptedSub } from "../../+state/subs.interfaces";
import * as fromSubsActions from "../../+state/subs.actions";

@Component({
  selector: 'accepted-sub-show',
  templateUrl: './accepted-sub-show.component.html',
  styleUrls: ['./accepted-sub-show.component.css']
})
export class AcceptedSubShowComponent implements OnInit {
  sub$: Observable<Sub>

  constructor(private store: Store<SubsState>) { }

  ngOnInit() {
    this.sub$ = this.store.select(getSelectedAcceptedSub);
  }
}
