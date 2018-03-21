import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import {
  SubsState,
  getAcceptedSubsEntities
} from "../../+state/parties.interfaces";

@Component({
  selector: 'accepted-parties',
  templateUrl: './accepted-parties.component.html',
  styleUrls: ['./accepted-parties.component.css']
})
export class AcceptedSubsComponent implements OnInit {
  public acceptedSubs$: Observable<any>;

  constructor(private store: Store<SubsState>) { }

  ngOnInit() {
    this.acceptedSubs$ = this.store.select(getAcceptedSubsEntities);
  }

}
