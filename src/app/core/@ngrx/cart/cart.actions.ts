import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/cart/models';
import { Product } from 'src/app/shared';

// In case of Actions: LoadCard, AddToCard no interaction with backend, so we use Store as cache
export const LoadCartItemsAction = createAction(
  '[CART] LOAD_CART_ITEMS'
);
// export const LoadCartItemsSuccess = createAction(
//   '[CART] LOAD_CART_ITEMS_SUCCEESS',
//   props<{ items: CartItem[] }>()
// );
// export const LoadCartItemsError = createAction(
//   '[CART] LOAD_CART_ITEMS_ERROR',
//   props<{ error: Error | string }>()
// );

export const AddCartItemAction = createAction(
  '[CART] ADD_CART_ITEM',
  props<{ product: Product }>()
);
// export const AddCartItemsSuccess = createAction(
//   '[CART] ADD_CART_ITEM_SUCCEESS',
//   props<{ item: CartItem }>()
// );
// export const AddCartItemsError = createAction(
//   '[CART] ADD_CART_ITEM_ERROR',
//   props<{ error: Error | string }>()
// );

export const DeleteCartItemAction = createAction(
  '[CART] DELETE_CART_ITEM',
  props<{ item: CartItem }>()
);
// export const DeleteCartItemsSuccess = createAction(
//   '[CART] DELETE_CART_ITEM_SUCCEESS',
//   props<{ item: CartItem }>()
// );
// export const DeleteCartItemsError = createAction(
//   '[CART] DELETE_CART_ITEM_ERROR',
//   props<{ error: Error | string }>()
// );

export const DeleteAllCartAction = createAction(
  '[CART] DELETE_ALL_CART'
);
// export const DeleteAllCartSuccess = createAction(
//   '[CART] DELETE_ALL_CART_SUCCEESS',
//   props<{ item: CartItem }>()
// );
// export const DeleteAllCartError = createAction(
//   '[CART] DELETE_ALL_CART_ERROR',
//   props<{ error: Error | string }>()
// );
