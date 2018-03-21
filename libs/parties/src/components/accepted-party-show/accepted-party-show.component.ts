import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from "@ngrx/store";
import { Sub } from "../../models/party.model";
import { SubsState, getSelectedAcceptedSub } from "../../+state/parties.interfaces";
import * as fromSubsActions from "../../+state/parties.actions";

@Component({
  selector: 'accepted-party-show',
  templateUrl: './accepted-party-show.component.html',
  styleUrls: ['./accepted-party-show.component.css']
})
export class AcceptedSubShowComponent implements OnInit {
  party$: Observable<Sub>

  constructor(private store: Store<SubsState>) { }

  ngOnInit() {
    this.party$ = this.store.select(getSelectedAcceptedSub);
  }
}
