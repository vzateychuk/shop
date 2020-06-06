import { Action, createReducer, on } from '@ngrx/store';
import { initialCartState, CartState } from './cart.state';
import {
  LoadCartItemsAction,
  AddCartItemAction,
  DeleteAllCartAction,
  DeleteCartItemAction
} from './cart.actions';
import { CartItem, CartItemModel } from 'src/app/cart/models';

export const cartFeatureKey = 'cart';

const reducer = createReducer(
  initialCartState,
  on(LoadCartItemsAction, state => {
    return { ...state };
  }),
  on(AddCartItemAction, (state, {product}) => {
    const data = [...state.data];
    const idx = data.findIndex(item => item.sku === product.sku);
    if (idx > -1) {
      const newAmount = data[idx].amount + 1;
      const item = {...data[idx], amount: newAmount} as CartItem;
      data.splice(idx, 1, item);
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
  on(DeleteAllCartAction, state => {
    const data: ReadonlyArray<CartItem> = [];
    return { ...state, data };
  }),
);

export function cartReducer(state: CartState | undefined, action: Action) {
  return reducer(state, action);
}
