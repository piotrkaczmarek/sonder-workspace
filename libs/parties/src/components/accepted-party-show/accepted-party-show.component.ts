import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from "@ngrx/store";
import { Party } from "../../models/party.model";
import { PartiesState, getSelectedAcceptedParty } from "../../+state/parties.interfaces";
import * as fromPartiesActions from "../../+state/parties.actions";

@Component({
  selector: 'accepted-party-show',
  templateUrl: './accepted-party-show.component.html',
  styleUrls: ['./accepted-party-show.component.css']
})
export class AcceptedPartyShowComponent implements OnInit {
  party$: Observable<Party>

  constructor(private store: Store<PartiesState>) { }

  ngOnInit() {
    this.party$ = this.store.select(getSelectedAcceptedParty);
  }
}
