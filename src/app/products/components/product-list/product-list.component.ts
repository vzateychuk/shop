import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared';
import { Router, ActivatedRoute } from '@angular/router';
// @ngrx
import {
  AppState,
  ProductsState,
  AddToCartProductAction,
  LoadProductListAction,
  DeleteProductAction,
  productsStateSelector,
  AddCartItemAction,
  selectProductsData,
  selectProductsStateError
} from 'src/app/core/@ngrx';
import { Store, select } from '@ngrx/store';
// rxjs
import { Observable } from 'rxjs';

@Component({
  selector: 'epa-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // productsState$: Observable<ProductsState>;
  productList$: Observable<ReadonlyArray<Product>>;
  productError$: Observable<string | Error>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // Subscribe for the data
    this.productList$ = this.store.pipe( select(selectProductsData) );
    this.productError$ = this.store.pipe( select(selectProductsStateError) );
    // Initiate dataflow
    this.store.dispatch( LoadProductListAction() );
  }

  onAddToCart(addToCartProduct: Product) {
    this.store.dispatch( AddToCartProductAction( {product: addToCartProduct}) );
    this.store.dispatch( AddCartItemAction( {product: addToCartProduct}) );
  }

  onEditProduct(product: Product) {
    const link = ['edit', product.sku];
    this.router.navigate(link, {relativeTo: this.route});
  }

  onCreateProduct(event) {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onDeleteProduct(productToDelete: Product) {
    this.store.dispatch(DeleteProductAction( {product: productToDelete}) );
  }

}
