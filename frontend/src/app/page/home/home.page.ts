import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Customer } from '../../model/customer';
import { PaymentData } from '../../model/paymentData';
import { PaymentService } from '../../service/payment.service';
import KRGlue from "@lyracom/embedded-form-glue";
import { FormTokenResponse } from '../../model/formTokenResponse';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  public paymentFormGroup: FormGroup;
  public paymentResult$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private formBuilder: FormBuilder, public paymentService: PaymentService) {
    this.paymentFormGroup = this.formBuilder.group({
      amount: [900],
      currency: ["XPF"],
      orderId: ["myOrderId-999999"],
      email: ["sample@example.com"]
    });
  }

  ngAfterViewInit() {
    this.paymentResult$.subscribe(value => {
      console.log("paymentResult changed: " + value);
    })
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
    this.paymentService.createPayment(paymentData).subscribe((formToken) => {
      console.log("formToken:");
      console.log(formToken);
      this.showFormWithformToken(formToken);
    })
  }

  showFormWithformToken(formTokenResponse: FormTokenResponse) {
    const endpoint = "https://static.osb.pf";
    const publicKey = "58739933:testpublickey_NUFA6m8QLqEaHktbQ1TkA7Z596H8KEFCiKOaO4871cZCH";
    KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
      .then( ({ KR }) =>
        KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formTokenResponse.formToken,
          "kr-language": "fr-FR" /* to update initialization parameter */
        })
      )
      .then( ({ KR }) =>
        KR.addForm("#myPaymentForm")
      ) /* add a payment form  to myPaymentForm div*/
      .then(({ KR, result }) =>
        KR.showForm(result.formId)
      ) /* show the payment form */
      .then( ({ KR }) => KR.onSubmit(response => this.showPaid(response)))
  }

  showPaid(response: KRPaymentResponse) {
    if (response.clientAnswer.orderStatus === "PAID") {
      console.log("showPaid: payé");
      console.log(response.clientAnswer.orderStatus);
      // Manage the payment done redirection here
      this.paymentResult$.next("commande payée");
    } else {
      console.log("showPaid: refusé");
      // Show error message to the user
      this.paymentResult$.next("commande annulée");
    }
    return false; // If you want to prevent the de default redirection
  }
}
