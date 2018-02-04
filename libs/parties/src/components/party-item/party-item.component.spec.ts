import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyItemComponent } from './party-item.component';

describe('PartyItemComponent', () => {
  let component: PartyItemComponent;
  let fixture: ComponentFixture<PartyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
