import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from 'src/app/model/customer';
import { PaymentData } from 'src/app/model/paymentData';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent {
  public paymentFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, public paymentService: PaymentService) {
    this.paymentFormGroup = this.formBuilder.group({
      amount: [900],
      currency: ["XPF"],
      orderId: ["myOrderId-999999"],
      email: ["sample@example.com"]
    });
  }

  submitPayment() {
    let customer: Customer = {
      email: this.paymentFormGroup.value.email
    };
    let paymentData: PaymentData = {
      amount: this.paymentFormGroup.value.amount,
      currency: this.paymentFormGroup.value.currency,
      orderId: this.paymentFormGroup.value.orderId,
      customer: customer
    };
    console.log("paymentData:");
    console.log(paymentData);
    this.paymentService.createPayment(paymentData);
  }

}
