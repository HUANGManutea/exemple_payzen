import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PaymentData } from '../model/paymentData';
import { HttpHeaders } from '@angular/common/http';
import { FormTokenResponse } from '../model/formTokenResponse';

@Injectable()
export class PaymentService {

  constructor(private http: HttpClient) { }

  createPayment(paymentData: PaymentData): Observable<FormTokenResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<FormTokenResponse>('http://localhost:3000/payment', paymentData, httpOptions);
  }
}
