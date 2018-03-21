import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import {
  SubsState,
  getAcceptedSubsEntities
} from "../../+state/subs.interfaces";

@Component({
  selector: 'accepted-subs',
  templateUrl: './accepted-subs.component.html',
  styleUrls: ['./accepted-subs.component.css']
})
export class AcceptedSubsComponent implements OnInit {
  public acceptedSubs$: Observable<any>;

  constructor(private store: Store<SubsState>) { }

  ngOnInit() {
    this.acceptedSubs$ = this.store.select(getAcceptedSubsEntities);
  }

}
