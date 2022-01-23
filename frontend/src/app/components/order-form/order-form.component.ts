import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from 'src/app/model/customer';
import { OrderData } from 'src/app/model/orderData';
import { PaymentService } from 'src/app/service/payment.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  @Output() orderCreated = new EventEmitter<void>();
  public orderFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, public paymentService: PaymentService) {
    this.orderFormGroup = this.formBuilder.group({
      amount: [900],
      currency: ["XPF"],
      orderId: ["myOrderId-999999"],
      email: ["sample@example.com"]
    });
  }

  submitPayment() {
    let customer: Customer = {
      email: this.orderFormGroup.value.email
    };
    let paymentData: OrderData = {
      amount: this.orderFormGroup.value.amount,
      currency: this.orderFormGroup.value.currency,
      orderId: this.orderFormGroup.value.orderId,
      customer: customer
    };
    this.paymentService.createOrder(paymentData).subscribe(value => {
      this.paymentService.formTokenSource.next(value);
      this.orderCreated.emit();
    })
  }
}
