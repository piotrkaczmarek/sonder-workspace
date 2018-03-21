import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";
import {
  SubsState,
  getSubFeedEntities
} from "../../+state/subs.interfaces";

@Component({
  selector: "sub-feed",
  templateUrl: "./sub-feed.component.html",
  styleUrls: ["./sub-feed.component.css"]
})
export class SubFeedComponent implements OnInit {
  public subPosts$: Observable<any>;
  public subId: number;

  constructor(private store: Store<SubsState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subPosts$ = this.store.select(getSubFeedEntities);
    this.route.paramMap.subscribe(route => (this.subId = parseInt(route["params"].subId, 10)));
  }
}
