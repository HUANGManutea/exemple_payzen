import { CartItem } from "./cartItem";

export interface Cart {
  cartItems: Array<CartItem>,
  total: number
}