import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Customer } from './model/customer';
import { PaymentData } from './model/paymentData';
import { PaymentService } from './service/payment.service';
import KRGlue from "@lyracom/embedded-form-glue";
import { FormTokenResponse } from './model/formTokenResponse';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
    this.paymentService.createPayment(paymentData).subscribe((formTokenResponse) => {
      console.log("formTokenResponse:");
      console.log(formTokenResponse);
      this.showFormWithformToken(formTokenResponse);
    })
  }
  
  async showFormWithformToken(formTokenResponse: FormTokenResponse) {
    let KRWrapper = await KRGlue.loadLibrary(environment.jsEndpointLibrary, environment.jsPublicKey) /* Load the remote library */

    let KR = KRWrapper.KR
    
    await KR.setFormConfig({
      /* set the minimal configuration */
      formToken: formTokenResponse.formToken,
      "kr-language": "fr-FR", /* to update initialization parameter */
      // this ignore is important,
      // kr-popin is required,
      // but the interface does not describe this field
      // @ts-ignore
      'kr-popin': true,
    })
    //add a payment form  to myPaymentForm div
    let KRWrapperResult = await KR.addForm("#myPaymentForm")
    let result = KRWrapperResult.result

    await KR.onSubmit(response => this.paymentService.validatePayment(response));

    // show the popin
    await KR.openPopin(result.formId);
    // show the payment form
    await KR.showForm(result.formId);

  }
}
