import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutPage } from './checkout/checkout.page';
import { OrderResultPage } from './order-result/order-result.page';
import { PaymentPage } from './payment/payment.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsModule } from '../components/components.module';
import { MatButtonModule } from '@angular/material/button';
import { ShopPage } from './shop/shop.page';

const pages = [
  CheckoutPage,
  OrderResultPage,
  PaymentPage,
  ShopPage
];

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
