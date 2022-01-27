import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './page/home/home.page';
import { OrderResultPage } from './page/order-result/order-result.page';
import { PaymentPage } from './page/payment/payment.page';

const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'payment', component: PaymentPage},
  {path: 'order-result', component: OrderResultPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
