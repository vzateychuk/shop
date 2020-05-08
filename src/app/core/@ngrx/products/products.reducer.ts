import { Action, createReducer, on } from '@ngrx/store';
import { initialProductsState, ProductsState } from './products.state';
import { loadProducts, loadProduct, createProduct, updateProduct, deleteProduct, buyProduct, } from './products.actions';

export const productsFeatureKey = 'products';

export const reducer = createReducer(
  initialProductsState,
  on(loadProducts, state => {
    console.log('--> loadProducts action being handled');
    return {...state};
  }),
  on(loadProduct, state => {
    console.log('--> loadProduct action being handled');
    return {...state};
  }),
  on(createProduct, state => {
    console.log('--> createProducts action being handled');
    return {...state};
  }),
  on(updateProduct, state => {
    console.log('--> updateProducts action being handled');
    return {...state};
  }),
  on(deleteProduct, state => {
    console.log('--> deleteProducts action being handled');
    return {...state};
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
