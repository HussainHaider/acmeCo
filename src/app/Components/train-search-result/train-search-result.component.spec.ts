import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrainSearchResultComponent} from './train-search-result.component';

describe('TrainSearchResultComponent', () => {
  let component: TrainSearchResultComponent;
  let fixture: ComponentFixture<TrainSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainSearchResultComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
