import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss']
})
export class CheckoutPage {

  constructor(private ngZone: NgZone, private router: Router) {

  }

  navigateToPayment() {
    this.ngZone.run(()=>this.router.navigate(['/payment']));
  }
}
