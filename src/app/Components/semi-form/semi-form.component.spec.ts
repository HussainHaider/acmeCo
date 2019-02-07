import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SemiFormComponent} from './semi-form.component';

describe('SemiFormComponent', () => {
  let component: SemiFormComponent;
  let fixture: ComponentFixture<SemiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SemiFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
