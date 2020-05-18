import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from 'src/app/products/services/product.service';
import { Observable } from 'rxjs';
import { switchMap, pluck, concatMap } from 'rxjs/operators';
import {
  LoadProductsAction,
  LoadProductsSuccess,
  LoadProductsError,
  LoadProductAction,
  LoadProductSuccess,
  LoadProductError,
  UpdateProductAction,
  UpdateProductSuccess,
  UpdateProductsError,
  CreateProductAction,
  CreateProductSuccess,
  CreateProductsError,
  DeleteProductAction,
  DeleteProductSuccess,
  DeleteProductsError,
  AddToCartAction,
  AddToCartSuccess,
  AddToCartError
} from './products.actions';
import { AppState } from '..';

@Injectable()
export class  ProductsEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private productService: ProductService
  ) { }

  loadProducts$: Observable<Action> = createEffect( () =>
    this.actions$.pipe(
      ofType(LoadProductsAction),
      switchMap( action =>
        this.productService.getProducts()
          .then(products => LoadProductsSuccess({products}))
          .catch(err => LoadProductsError(err))
      )
    )
  );

  loadProduct$: Observable<Action> = createEffect( () =>
    this.actions$.pipe(
      ofType(LoadProductAction),
      pluck('sku'),
      switchMap( sku =>
        this.productService.getProduct(sku)
          .then(product => LoadProductSuccess({product}))
          .catch(err => LoadProductError(err))
      )
    )
  );

  updateProduct$: Observable<Action> = createEffect( () =>
    this.actions$.pipe(
      ofType(UpdateProductAction),
      pluck('product'),
      concatMap( product =>
        this.productService.updateProduct(product)
          .then( updated => UpdateProductSuccess({product: updated}) )
          .catch( err => UpdateProductsError(err) )
        )
    )
  );

  createProduct$: Observable<Action> = createEffect( () =>
    this.actions$.pipe(
      ofType(CreateProductAction),
      pluck('product'),
      concatMap( product =>
        this.productService.createProduct(product)
          .then( created => CreateProductSuccess({product: created}) )
          .catch( err => CreateProductsError(err) )
        )
    )
  );

  deleteProduct$: Observable<Action> = createEffect( () =>
    this.actions$.pipe(
      ofType(DeleteProductAction),
      pluck('product'),
      concatMap( product =>
        this.productService.deleteProduct(product)
          .then( created => DeleteProductSuccess({product: created}) )
          .catch( err => DeleteProductsError(err) )
      )
    )
  );

  addToCartProduct$: Observable<Action> = createEffect( () =>
    this.actions$.pipe(
      ofType(AddToCartAction),
      pluck('product'),
      concatMap(prod =>
        this.productService.addToCard(prod, 1)
        .then(resp => AddToCartSuccess({product: resp}))
        .catch(err => AddToCartError(err))
      )
    )
  );

}
