import { Action, createReducer, on } from '@ngrx/store';
import { initialProductsState, ProductsState } from './products.state';
import {
  LoadProductsAction,
  LoadProductsSuccess,
  LoadProductsError,
  LoadProductAction,
  LoadProductSuccess,
  LoadProductError,
  CreateProductAction,
  CreateProductSuccess,
  CreateProductsError,
  UpdateProductAction,
  UpdateProductsError,
  UpdateProductSuccess,
  DeleteProductAction,
  DeleteProductSuccess,
  DeleteProductsError,
  AddToCartAction,
  AddToCartSuccess,
  AddToCartError
} from './products.actions';
import { ProductModel, Product } from 'src/app/shared';

export const productsFeatureKey = 'products';

export const reducer = createReducer(
  initialProductsState,
  on(LoadProductsAction, state => {
    return { ...state, loading: true };
  }),
  on(LoadProductsSuccess, (state, {products}) => {
    const data = [...products];
    return {...state, data, loading: false, loaded: true, selectedProduct: null};
  }),

  on(LoadProductAction, state => {
    return {...state, loading: true};
  }),
  on(LoadProductSuccess, (state, {product}) => {
    const selectedProduct = {...product};
    return {...state, selectedProduct, loading: false, loaded: true};
  }),

  on(UpdateProductAction, state => {
    return {...state, loading: true};
  }),
  on(UpdateProductSuccess, (state, {product}) => {
    const newdata = [...state.data];
    const idx = newdata.findIndex(p => p.sku === product.sku);
    if (idx > -1) {
      newdata[idx] = {...product};
    }
    return {...state, data: newdata, loading: false, loaded: true};
  }),

  on(CreateProductAction, state => {
    return {...state, loading: true};
  }),
  on(CreateProductSuccess, (state, {product}) => {
    const data = [...state.data, {...product}];
    return {...state, data, loading: false, loaded: true};
  }),

  on(DeleteProductAction, state => {
    return {...state, loading: true};
  }),
  on(DeleteProductSuccess, (state, {product}) => {
    const data = state.data.filter(p => p.sku !== product.sku);
    return {...state, data, loading: false, loaded: true};
  }),

  on(AddToCartAction, state => {
    return {...state, loading: true};
  }),
  on(AddToCartSuccess, (state, {product}) => {
    const data = state.data.map(p => {
        if (p.sku === product.sku) {
          return {...product, amountAvailable: (p.amountAvailable - 1) };
        } else {
          return p;
        }
    });

    // return new state
    return {...state, data};
  }),

  // error handler
  on(
    LoadProductsError,
    LoadProductError,
    UpdateProductsError,
    CreateProductsError,
    DeleteProductsError,
    AddToCartError,
    (state, {error}) => {
      console.log('ErrorHandler invoked');
      return {...state, error, loading: false, loaded: false};
  })

);

export function productsReducer(state: ProductsState | undefined, action: Action) {
  return reducer(state, action);
}
