import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SemiBarComponent} from './semi-bar.component';

describe('SemiBarComponent', () => {
  let component: SemiBarComponent;
  let fixture: ComponentFixture<SemiBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SemiBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemiBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
