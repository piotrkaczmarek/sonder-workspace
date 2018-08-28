import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: "top-nav-bar",
  templateUrl: "./top-nav-bar.component.html",
  styleUrls: ["./top-nav-bar.component.css"]
})
export class TopNavBarComponent implements OnInit {
  @Input() loggedIn: boolean;
  @Input() sidenav;

  constructor() {}

  ngOnInit() {}
}
