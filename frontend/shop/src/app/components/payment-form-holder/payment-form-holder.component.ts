import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import KRGlue from '@lyracom/embedded-form-glue';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-payment-form-holder',
  templateUrl: './payment-form-holder.component.html',
  styleUrls: ['./payment-form-holder.component.scss']
})
export class PaymentFormHolderComponent implements OnInit, AfterViewInit {
  @Output() paymentDone = new EventEmitter<void>();
  public endpoint = "https://static.osb.pf";
  public publicKey = "58739933:testpublickey_NUFA6m8QLqEaHktbQ1TkA7Z596H8KEFCiKOaO4871cZCH";
  public KR: KR | null;

  constructor(public paymentService: PaymentService) {
    this.KR = null;
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    await this.loadPaymentLibrary();
    await this.showFormWithformToken();
  }

  private async loadPaymentLibrary(): Promise<void> {
    // Only load the library one time
    if (!this.KR) {
      await KRGlue.loadLibrary(this.endpoint, this.publicKey).then(async ({KR}) => {
        await KR.setFormConfig({
          'kr-language': 'fr-FR',
          'kr-spa-mode': true
        });
        this.KR = KR;
        console.log('Library loaded');
      });
    }
  }

  private async showFormWithformToken(): Promise<void> {
    // Cleans forms
    if (!this.KR) {
      console.log("KR not initialized");
    }else {
      await this.KR.removeForms();

      // Binds form events
      this.KR.onSubmit((response) => this.onPaid(response));
      this.KR.onError((error) => {
        console.error(error.errorMessage);
      });

      // Builds the form
      let formTokenResponse = this.paymentService.formTokenSource.value;
      if (formTokenResponse != null) {
        await this.KR.setFormToken(formTokenResponse.formToken);
        await this.KR.addForm('#myPaymentForm').then(({KR, result}) => {
          console.log(`Form added : ${result.formId}`);
          return KR.showForm(result.formId);
        });
      }
    }
  }

  onPaid(response: KRPaymentResponse) {
    this.paymentService.updateOrderResult(response.clientAnswer.orderStatus);
    this.paymentDone.emit();
  }
}
