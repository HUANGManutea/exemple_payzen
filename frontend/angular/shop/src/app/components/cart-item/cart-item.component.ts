import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/model/cartItem';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() item: CartItem = {
    product: <Product> {
       name: "none",
       price: 0,
       imageUrl: ""
    },
    quantity: 0
  };
  
  constructor() { }

}
