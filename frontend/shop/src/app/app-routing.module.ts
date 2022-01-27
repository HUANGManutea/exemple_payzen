import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPage } from './page/checkout/checkout.page';
import { OrderResultPage } from './page/order-result/order-result.page';
import { PaymentPage } from './page/payment/payment.page';
import { ShopPage } from './page/shop/shop.page';

const routes: Routes = [
  {path: '', component: ShopPage},
  {path: 'checkout', component: CheckoutPage},
  {path: 'payment', component: PaymentPage},
  {path: 'order-result', component: OrderResultPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
