import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderData } from '../model/orderData';
import { HttpHeaders } from '@angular/common/http';
import { FormTokenResponse } from '../model/formTokenResponse';
import { OrderResult } from '../model/orderResult';

@Injectable()
export class PaymentService {
  public formTokenSource = new BehaviorSubject<FormTokenResponse | null>(null);

  
  private orderResultSource = new BehaviorSubject<OrderResult | null>(null);
  public orderResult$ = this.orderResultSource.asObservable();

  constructor(private http: HttpClient) { }

  createOrder(paymentData: OrderData): Observable<FormTokenResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<FormTokenResponse>('http://localhost:3000/payment', paymentData, httpOptions)
  }

  updateOrderResult(orderStatus: string) {
    if (orderStatus === "PAID") {
      // Manage the payment done redirection here
      this.orderResultSource.next({result: "commande payée"});
    } else {
      // Show error message to the user
      this.orderResultSource.next({result: "commande annulée"});
    }
  }

  resetPayment() {
    this.formTokenSource.next(null);
    this.orderResultSource.next(null);
  }
}
