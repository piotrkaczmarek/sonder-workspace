import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedPartiesComponent } from './accepted-parties.component';

describe('AcceptedPartiesComponent', () => {
  let component: AcceptedPartiesComponent;
  let fixture: ComponentFixture<AcceptedPartiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedPartiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
