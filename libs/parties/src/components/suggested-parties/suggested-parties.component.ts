import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { SubsState, getSuggestedSubsEntities } from "../../+state/parties.interfaces";

@Component({
  selector: 'app-suggested-parties',
  templateUrl: './suggested-parties.component.html',
  styleUrls: ['./suggested-parties.component.css']
})
export class SuggestedSubsComponent implements OnInit {
  public suggestedSubs$: Observable<any>;

  constructor(private store: Store<SubsState>) { }

  ngOnInit() {
    this.suggestedSubs$ = this.store.select(getSuggestedSubsEntities);
  }
}
