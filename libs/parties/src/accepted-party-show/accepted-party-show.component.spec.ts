import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedPartyShowComponent } from './accepted-party-show.component';

describe('AcceptedPartyShowComponent', () => {
  let component: AcceptedPartyShowComponent;
  let fixture: ComponentFixture<AcceptedPartyShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedPartyShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedPartyShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
