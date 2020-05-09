import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from 'src/app/products/services/product.service';
import { Observable } from 'rxjs';
import {
  loadProductsAction,
  loadProductsSuccess,
  loadProductsError,
  loadProductAction,
  loadProductSuccess,
  loadProductError,
  updateProductAction,
  updateProductSuccess,
  updateProductsError,
  createProductAction,
  createProductSuccess,
  createProductsError,
  deleteProductAction,
  deleteProductSuccess,
  deleteProductsError
} from './products.actions';
import { switchMap, pluck, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class  ProductsEffects {

  constructor(
    private router: Router,
    private actions$: Actions,
    private productService: ProductService
  ) {
    console.log('[ProductsEffects]');
  }

  loadProducts$: Observable<Action> = createEffect( () =>
    this.actions$.pipe(
      ofType(loadProductsAction),
      switchMap( action =>
        this.productService.getProducts()
          .then(products => loadProductsSuccess({products}))
          .catch(err => loadProductsError(err))
      )
    )
  );

  loadProduct$: Observable<Action> = createEffect( () =>
    this.actions$.pipe(
      ofType(loadProductAction),
      pluck('sku'),
      switchMap( sku =>
        this.productService.getProduct(sku)
          .then(product => loadProductSuccess({product}))
          .catch(err => loadProductError(err))
      )
    )
  );

  updateProduct$: Observable<Action> = createEffect( () =>
    this.actions$.pipe(
      ofType(updateProductAction),
      pluck('product'),
      concatMap( product =>
        this.productService.updateProduct(product)
          .then( updated => updateProductSuccess({product: updated}) )
          .catch( err => updateProductsError(err) )
        )
    )
  );

  createProduct$: Observable<Action> = createEffect( () =>
    this.actions$.pipe(
      ofType(createProductAction),
      pluck('product'),
      concatMap( product =>
        this.productService.createProduct(product)
          .then( created => createProductSuccess({product: created}) )
          .catch( err => createProductsError(err) )
        )
    )
  );

  deleteProduct$: Observable<Action> = createEffect( () =>
    this.actions$.pipe(
      ofType(deleteProductAction),
      pluck('product'),
      concatMap( product =>
        this.productService.deleteProduct(product)
          .then( created => deleteProductSuccess({product: created}) )
          .catch( err => deleteProductsError(err) )
      )
    )
  );

}
