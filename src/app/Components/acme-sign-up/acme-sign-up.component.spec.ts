import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AcmeSignUpComponent} from './acme-sign-up.component';

describe('AcmeSignUpComponent', () => {
  let component: AcmeSignUpComponent;
  let fixture: ComponentFixture<AcmeSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AcmeSignUpComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcmeSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
