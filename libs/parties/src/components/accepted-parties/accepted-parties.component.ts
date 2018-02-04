import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import {
  PartiesState,
  getAcceptedPartiesEntities
} from "../../+state/parties.interfaces";

@Component({
  selector: 'accepted-parties',
  templateUrl: './accepted-parties.component.html',
  styleUrls: ['./accepted-parties.component.css']
})
export class AcceptedPartiesComponent implements OnInit {
  public acceptedParties$: Observable<any>;

  constructor(private store: Store<PartiesState>) { }

  ngOnInit() {
    this.acceptedParties$ = this.store.select(getAcceptedPartiesEntities);
  }

}
