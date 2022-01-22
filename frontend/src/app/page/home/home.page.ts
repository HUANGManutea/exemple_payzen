import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PaymentService } from '../../service/payment.service';
import KRGlue from "@lyracom/embedded-form-glue";
import { FormTokenResponse } from '../../model/formTokenResponse';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit {
  public paymentResult$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(public paymentService: PaymentService) {
  }

  ngOnInit(): void {
      this.paymentService.formTokenResponse$.subscribe((formTokenResponse) => {
        this.showFormWithformToken(formTokenResponse);
      })
  }

  ngAfterViewInit(): void {
    this.paymentResult$.subscribe(value => {
      console.log("paymentResult changed: " + value);
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
