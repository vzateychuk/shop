import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared';
import { Router } from '@angular/router';
// @ngrx
import { AppState, ProductsState, buyProduct } from 'src/app/core/@ngrx';
import { Store, select } from '@ngrx/store';
// rxjs
import { Observable } from 'rxjs';

@Component({
  selector: 'epa-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsState$: Observable<ProductsState>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.productsState$ = this.store.pipe( select('productsState') );
  }

  onEditProduct(product: Product) {
    this.router.navigate(['products/edit', product.sku]);
  }

  onAddToCart(productToBuy: Product) {
    console.log('ProductListComponent.onAddToCart: ' + productToBuy.sku);
//    const productToBuy: Product = {...productToBuy};
//    this.store.dispatch(buyProduct( {product: productToBuy}) );
    this.store.dispatch(buyProduct( {product: productToBuy}) );
  }

}
