import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormTokenResponse } from 'src/app/model/formTokenResponse';
import { OrderResult } from 'src/app/model/orderResult';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-order-result-page',
  templateUrl: './order-result.page.html',
  styleUrls: ['./order-result.page.scss']
})
export class OrderResultPage implements OnInit {
  public orderResult$: Observable<OrderResult | null>;

  constructor(public paymentService: PaymentService, private ngZone: NgZone, private router: Router) {
    this.orderResult$ = this.paymentService.orderResult$;
  }
  
  ngOnInit(): void {
  }

  goToHome() {
    this.paymentService.resetPayment();
    this.ngZone.run(()=>this.router.navigate(['/']));
  }
}
