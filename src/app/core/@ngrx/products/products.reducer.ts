import { Action, createReducer, on } from '@ngrx/store';
import { initialProductsState, ProductsState } from './products.state';
import {
  loadProductsAction,
  loadProductsSuccess,
  loadProductsError,
  loadProductAction,
  loadProductSuccess,
  loadProductError,
  createProductAction,
  createProductSuccess,
  createProductsError,
  updateProductAction,
  updateProductsError,
  updateProductSuccess,
  deleteProductAction,
  deleteProductSuccess,
  deleteProductsError,
  buyProduct
} from './products.actions';

export const productsFeatureKey = 'products';

export const reducer = createReducer(
  initialProductsState,
  on(loadProductsAction, state => {
    return { ...state, loading: true };
  }),
  on(loadProductsSuccess, (state, {products}) => {
    const newdata = [...products];
    return {...state, data: newdata, loading: false, loaded: true, selectedProduct: null};
  }),
  // error handler
  on(
    loadProductsError,
    loadProductError,
    updateProductsError,
    createProductsError,
    deleteProductsError,
    (state, {error}) => {
      return {...state, error, loading: false, loaded: false};
  }),

  on(loadProductAction, state => {
    return {...state, loading: true};
  }),
  on(loadProductSuccess, (state, {product}) => {
    const selectedProduct = {...product};
    return {...state, selectedProduct, loading: false, loaded: true};
  }),

  on(updateProductAction, state => {
    return {...state, loading: true};
  }),
  on(updateProductSuccess, (state, {product}) => {
    const newdata = [...state.data];
    const idx = newdata.findIndex(p => p.sku === product.sku);
    if (idx > -1) {
      newdata[idx] = {...product};
    }
    return {...state, data: newdata, loading: false, loaded: true};
  }),

  on(createProductAction, state => {
    return {...state, loading: true};
  }),
  on(createProductSuccess, (state, {product}) => {
    const data = [...state.data, {...product}];
    return {...state, data, loading: false, loaded: true};
  }),

  on(deleteProductAction, state => {
    return {...state, loading: true};
  }),
  on(deleteProductSuccess, (state, {product}) => {
    const data = state.data.filter(p => p.sku !== product.sku);
    return {...state, data, loading: false, loaded: true};
  }),

  on(buyProduct, (state, {product}) => {
    const sku = product.sku;
    console.log('--> buyProduct action being handled, sku: #' + sku);
    // new array of data
    const data = state.data.map(p => {
      if (p.sku === sku) {
        return {...product, amountAvailable: (p.amountAvailable - 1) };
      } else {
        return p;
      }
    }  );
    // return new state
    return {...state, data};
  })
);

export function productsReducer(state: ProductsState | undefined, action: Action) {
  return reducer(state, action);
}
