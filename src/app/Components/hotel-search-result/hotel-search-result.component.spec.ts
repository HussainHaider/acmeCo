import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotelSearchResultComponent} from './hotel-search-result.component';

describe('HotelSearchResultComponent', () => {
  let component: HotelSearchResultComponent;
  let fixture: ComponentFixture<HotelSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotelSearchResultComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
