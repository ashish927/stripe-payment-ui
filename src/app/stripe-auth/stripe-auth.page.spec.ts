import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeAuthPage } from './stripe-auth.page';

describe('StripeAuthPage', () => {
  let component: StripeAuthPage;
  let fixture: ComponentFixture<StripeAuthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeAuthPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
