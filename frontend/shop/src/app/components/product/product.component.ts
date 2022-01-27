import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductQuantity } from 'src/app/model/addProduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product = {
    name: "none",
    price: 0,
    imageUrl: ""
  };
  @Output() buy = new EventEmitter<ProductQuantity>();
  public buyProductFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buyProductFormGroup = this.formBuilder.group({
      quantity: [1],
    });
  }

  ngOnInit(): void {
  }

  buyProducts() {
    let addProduct: ProductQuantity = {
      product: this.product,
      quantity: this.buyProductFormGroup.value.quantity
    }
    this.buy.emit(addProduct);
  }

}
