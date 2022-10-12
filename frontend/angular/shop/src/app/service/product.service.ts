import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable()
export class ProductService {
  private products: Array<Product> = [];
  constructor() {
    let product: Product = {
      name: "pizza",
      price: 1000,
      imageUrl: "assets/pizza.jpg"
    };
    this.products = [product];
  }

  getProducts(): Observable<Array<Product>> {
    return of(this.products);
  }
}
