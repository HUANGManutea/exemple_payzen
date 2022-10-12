import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderResult } from 'src/app/model/orderResult';
import { CartService } from 'src/app/service/cart.service';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-order-result-page',
  templateUrl: './order-result.page.html',
  styleUrls: ['./order-result.page.scss']
})
export class OrderResultPage implements OnInit {
  public orderResult$: Observable<OrderResult | null>;

  constructor(private paymentService: PaymentService, private cartService: CartService,  private ngZone: NgZone, private router: Router) {
    this.orderResult$ = this.paymentService.orderResult$;
  }
  
  ngOnInit(): void {
  }

  goToHome() {
    this.paymentService.resetPayment();
    this.cartService.resetCart();
    this.ngZone.run(()=>this.router.navigate(['/']));
  }
}
