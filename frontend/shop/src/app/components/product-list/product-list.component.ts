import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductQuantity } from 'src/app/model/addProduct';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products$: Observable<Array<Product>>;

  constructor(private productService: ProductService, private cartService: CartService) {
    this.products$ = this.productService.getProducts();
  }

  ngOnInit(): void {
  }

  buyProducts(buyProduct: ProductQuantity) {
    this.cartService.addProduct(buyProduct);
  }

}
