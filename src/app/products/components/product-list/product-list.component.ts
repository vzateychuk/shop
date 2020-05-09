import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared';
import { Router } from '@angular/router';
// @ngrx
import { AppState, ProductsState, buyProduct, loadProductsAction, deleteProductAction } from 'src/app/core/@ngrx';
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
    // Subscribe for the dataflow
    this.productsState$ = this.store.pipe( select('productsState') );
    // Initiate dataflow
    this.store.dispatch( loadProductsAction() );
  }

  onAddToCart(productToBuy: Product) {
    this.store.dispatch(buyProduct( {product: productToBuy}) );
  }

  onEditProduct(product: Product) {
    this.router.navigate(['products/edit', product.sku]);
  }

  onCreateProduct(event) {
    this.router.navigate(['products/add']);
  }

  onDeleteProduct(productToDelete: Product) {
    this.store.dispatch(deleteProductAction( {product: productToDelete}) );
  }

}
