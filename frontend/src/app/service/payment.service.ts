import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PaymentData } from '../model/paymentData';
import { HttpHeaders } from '@angular/common/http';
import { FormTokenResponse } from '../model/formTokenResponse';

@Injectable()
export class PaymentService {
  private formTokenSource = new ReplaySubject<FormTokenResponse>();
  public formTokenResponse$ = this.formTokenSource.asObservable();

  constructor(private http: HttpClient) { }

  createPayment(paymentData: PaymentData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    this.http.post<FormTokenResponse>('http://localhost:3000/payment', paymentData, httpOptions)
      .subscribe((value) => this.formTokenSource.next(value));
  }
}
