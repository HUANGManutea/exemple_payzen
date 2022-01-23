import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ComponentsModule } from '../components/components.module';
import { HomePage } from './home/home.page';
import { OrderResultPage } from './order-result/order-result.page';
import { PaymentPage } from './payment/payment.page';

const pages = [
  HomePage,
  OrderResultPage,
  PaymentPage
]

@NgModule({
  declarations: [
    ...pages
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ComponentsModule,
    MatButtonModule
  ],
  exports: [
    ...pages
  ]
})
export class PageModule { }
