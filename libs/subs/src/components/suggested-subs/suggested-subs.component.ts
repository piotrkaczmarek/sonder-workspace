import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { SubsState, getSuggestedSubsEntities } from "../../+state/subs.interfaces";

@Component({
  selector: 'app-suggested-subs',
  templateUrl: './suggested-subs.component.html',
  styleUrls: ['./suggested-subs.component.css']
})
export class SuggestedSubsComponent implements OnInit {
  public suggestedSubs$: Observable<any>;

  constructor(private store: Store<SubsState>) { }

  ngOnInit() {
    this.suggestedSubs$ = this.store.select(getSuggestedSubsEntities);
  }
}
