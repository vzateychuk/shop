import { Action, createReducer, on } from '@ngrx/store';
import { initialCartState, CartState } from './cart.state';
import {
  LoadCartItemsAction,
  AddCartItemAction,
  DeleteAllCartItemsAction,
  OrderCartSuccess,
  OrderCartsError,
  DeleteCartItemAction
} from './cart.actions';
import { CartItem, CartItemModel } from 'src/app/cart/models';

export const cartFeatureKey = 'cart';

export const reducer = createReducer(
  initialCartState,
  on(LoadCartItemsAction, state => {
    return { ...state };
  }),
  on(AddCartItemAction, (state, {product}) => {
    const data = [...state.data];
    const idx = data.findIndex(item => item.sku === product.sku);
    if (idx > -1) {
      data[idx].amount += data[idx].amount;
    } else {
      data.push( new CartItemModel(product.sku, product.price, 1) );
    }
    return { ...state, data };
  }),
  on(DeleteCartItemAction, (state, {item}) => {
    const data = [...state.data];
    const idx = data.findIndex(it => it.sku === item.sku);
    if (idx > -1) {
      data.splice(idx, 1);
    }
    return { ...state, data };
  }),
  on(DeleteAllCartItemsAction, state => {
    const data: ReadonlyArray<CartItem> = [];
    return { ...state, data };
  }),

  on(OrderCartSuccess, state => {
    return {...state, isLoading: false, isSuccess: true};
  }),
  on(OrderCartsError, (state, {error}) => {
    return {...state, error, isLoading: false, isSuccess: false};
  }),

);

export function cartReducer(state: CartState | undefined, action: Action) {
  return reducer(state, action);
}
