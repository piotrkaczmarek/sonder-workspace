import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { PartiesState, getSuggestedPartiesEntities } from "../../+state/parties.interfaces";

@Component({
  selector: 'app-suggested-parties',
  templateUrl: './suggested-parties.component.html',
  styleUrls: ['./suggested-parties.component.css']
})
export class SuggestedPartiesComponent implements OnInit {
  public suggestedParties$: Observable<any>;

  constructor(private store: Store<PartiesState>) { }

  ngOnInit() {
    this.suggestedParties$ = this.store.select(getSuggestedPartiesEntities);
  }
}
