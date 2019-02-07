import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AcmeLoginComponent} from './acme-login.component';

describe('AcmeLoginComponent', () => {
  let component: AcmeLoginComponent;
  let fixture: ComponentFixture<AcmeLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AcmeLoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcmeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
