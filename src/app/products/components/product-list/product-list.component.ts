import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel } from 'src/app/shared';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'epa-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() productList: Promise<Array<ProductModel>>; // зачем тут используется декоратор @Input(),
  // если это свойство заполняется тут внутри компонента?

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productList = this.productService.getProducts();
  }

  onEditProduct(product: ProductModel) {
    console.log('ProductList.onEditProduct(): ', product.sku);
    this.router.navigate(['products/edit', product.sku]);
  }

  onAddToCart(product: ProductModel) {
    console.log('ProductListComponent.onAddToCart: ' + product.sku);
  }

}
