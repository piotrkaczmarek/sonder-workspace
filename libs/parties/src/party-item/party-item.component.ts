import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-party-item',
  templateUrl: './party-item.component.html',
  styleUrls: ['./party-item.component.css']
})
export class PartyItemComponent implements OnInit {
  @Input() party: any;
  constructor() { }

  ngOnInit() {
  }

}
