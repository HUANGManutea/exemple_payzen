import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss']
})
export class PaymentPage {
  constructor(private ngZone: NgZone, private router: Router) {}

  navigateToOrderResult() {
    this.ngZone.run(()=>this.router.navigate(['/order-result']));
  }
}
