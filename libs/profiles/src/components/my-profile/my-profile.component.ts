import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import { Profile } from "../../models";
import { ProfilesState, getMyProfileData } from "../../+state/profiles.interfaces";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  private myProfile$: Observable<Profile>;
  constructor(private store: Store<ProfilesState>) { }

  ngOnInit() {
    this.myProfile$ = this.store.select(getMyProfileData);
  }

}
