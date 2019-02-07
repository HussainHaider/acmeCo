import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FlightHomePageComponent} from './flight-home-page.component';

describe('FlightHomePageComponent', () => {
  let component: FlightHomePageComponent;
  let fixture: ComponentFixture<FlightHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlightHomePageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
