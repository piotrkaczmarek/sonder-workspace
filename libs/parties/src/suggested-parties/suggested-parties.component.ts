import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { PartiesState, getAllParties, getSuggestedPartiesEntities } from "../+state/parties.interfaces";

@Component({
  selector: 'app-suggested-parties',
  templateUrl: './suggested-parties.component.html',
  styleUrls: ['./suggested-parties.component.css']
})
export class SuggestedPartiesComponent implements OnInit {
  public suggested$: Observable<any>;

  constructor(private store: Store<PartiesState>) { }

  ngOnInit() {
    this.suggested$ = this.store.select(getSuggestedPartiesEntities);
  }

}
