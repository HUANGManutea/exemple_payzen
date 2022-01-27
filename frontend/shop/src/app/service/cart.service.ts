import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductQuantity } from '../model/addProduct';
import { Cart } from '../model/cart';
import { CartItem } from '../model/cartItem';
import { Product } from '../model/product';

@Injectable()
export class CartService {
  public cartSource = new BehaviorSubject<Cart>(<Cart>{cartItems: [], total: 0});
  public cart$ = this.cartSource.asObservable();

  constructor() {
  }

  addProduct(productQuantity: ProductQuantity) {
    // copy values
    let cartItems: Array<CartItem> = [...this.cartSource.value.cartItems];
    let index = cartItems.findIndex(cartItem => cartItem.product.name === productQuantity.product.name);
    if(index < 0) {
      // item not in cart

      // create item
      let item: CartItem = {
        product: productQuantity.product,
        quantity: productQuantity.quantity
      };

      // calculate total
      let total = this.cartSource.value.total + (item.product.price * productQuantity.quantity);
      
      //update
      this.cartSource.next({
        cartItems: [item, ...this.cartSource.value.cartItems],
        total: total
      });
    } else {
      // item already in cart
      // add quantity
      cartItems[index].quantity += productQuantity.quantity;

      // calculate total
      let total = this.cartSource.value.total + (cartItems[index].product.price * productQuantity.quantity);

      // update
      this.cartSource.next({
        cartItems: [...cartItems],
        total: total
      });
    }
  }

  substractProduct(productQuantity: ProductQuantity) {
    let cartItems: Array<CartItem> = [...this.cartSource.value.cartItems];
    let index = cartItems.findIndex(cartItem => cartItem.product.name === productQuantity.product.name);
    if(index > 0) {
      // substract only if item in cart

      let total = this.cartSource.value.total;

      if (productQuantity.quantity >= cartItems[index].quantity) {
        // remove all quantity for this product time product price
        total -= cartItems[index].quantity * cartItems[index].product.price;
        // remove item from list
        cartItems.splice(index);
      } else {
        // remove quantity for this product time product price
        total -= productQuantity.quantity * productQuantity.product.price;
        // remove quantity from item
        cartItems[index].quantity -= productQuantity.quantity;
      }

      // update
      this.cartSource.next({
        cartItems: [...cartItems],
        total: total
      });

    }
  }

  resetCart() {
    this.cartSource.next({
      cartItems: [],
      total: 0
    });
  }

}
