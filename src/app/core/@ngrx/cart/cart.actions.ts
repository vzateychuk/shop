import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/cart/models';
import { Product } from 'src/app/shared';

// In case of Actions: LoadCard, AddToCard no interaction with backend, so we use Store as cache
export const LoadCartItemsAction = createAction(
  '[LOAD_CART_ITEMS_ACTION]'
);
export const AddCartItemAction = createAction(
  '[ADD_CART_ITEM_ACTION]',
  props<{ product: Product }>()
);
export const DeleteCartItemAction = createAction(
  '[DELETE_CART_ITEM_ACTION]',
  props<{ item: CartItem }>()
);
export const DeleteAllCartItemsAction = createAction(
  '[DELETE_ALL_CART_ITEMS_ACTION]'
);

// An order requires backend communication, so the Effects will be used
export const OrderCartAction = createAction(
  '[ORDER_CART_ACTION]'
);
export const OrderCartSuccess = createAction(
  '[ORDER_CART_SUCCESS]',
  props<{ item: CartItem[] }>()
);
export const OrderCartsError = createAction(
  '[ORDER_CART_ERROR]',
  props<{ error: Error | string }>()
);
