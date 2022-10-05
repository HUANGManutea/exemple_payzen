import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PaymentData } from '../model/paymentData';
import { HttpHeaders } from '@angular/common/http';
import { FormTokenResponse } from '../model/formTokenResponse';
import { environment } from 'src/environments/environment';
import { PaymentResult } from '../model/paymentResult';

@Injectable()
export class PaymentService {
  public paymentResult$ = new BehaviorSubject<PaymentResult | null>(null);

  constructor(private http: HttpClient) { }

  createPayment(paymentData: PaymentData): Observable<FormTokenResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<FormTokenResponse>(`${environment.backendBaseUrl}/payment`, paymentData, httpOptions);
  }

  validatePayment(response: KRPaymentResponse) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    this.http.post<PaymentResult>(`${environment.backendBaseUrl}/validatePayment`, response, httpOptions)
    .subscribe((response: PaymentResult) => {
      this.paymentResult$.next(response);
      // If you want to prevent the default redirection
      return false; 
    });
  }
}
