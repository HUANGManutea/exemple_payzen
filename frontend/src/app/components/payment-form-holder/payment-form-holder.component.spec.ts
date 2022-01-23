import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormHolderComponent } from './payment-form-holder.component';

describe('PaymentFormHolderComponent', () => {
  let component: PaymentFormHolderComponent;
  let fixture: ComponentFixture<PaymentFormHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentFormHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
