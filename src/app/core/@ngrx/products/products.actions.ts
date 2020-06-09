import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared';

export const LoadProductListAction = createAction(
  '[PRODUCTS] LOAD_LIST'
);
export const LoadProductListSuccess = createAction(
  '[PRODUCTS] LOAD_LIST_SUCCEESS',
  props<{ products: Product[] }>()
);
export const LoadProductListError = createAction(
  '[PRODUCTS] LOAD_LIST_ERROR',
  props<{ error: Error | string }>()
);

export const UpdateProductAction = createAction(
  '[PRODUCTS] UPDATE_PRODUCT',
  props<{ product: Product }>()
);
export const UpdateProductSuccess = createAction(
  '[PRODUCTS] UPDATE_PRODUCT_SUCCEESS',
  props<{ product: Product }>()
);
export const UpdateProductError = createAction(
  '[PRODUCTS] UPDATE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const CreateProductAction = createAction(
  '[PRODUCTS] CREATE_PRODUCT',
  props<{ product: Product }>()
);
export const CreateProductSuccess = createAction(
  '[PRODUCTS] CREATE_PRODUCT_SUCCEESS',
  props<{ product: Product }>()
);
export const CreateProductError = createAction(
  '[PRODUCTS] CREATE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const DeleteProductAction = createAction(
  '[DELETE_PRODUCT_ACTION]',
  props<{ product: Product }>()
);
export const DeleteProductSuccess = createAction(
  '[DELETE_PRODUCT_SUCCEESS]',
  props<{ product: Product }>()
);
export const DeleteProductsError = createAction(
  '[DELETE_PRODUCTS_ERROR]',
  props<{ error: Error | string }>()
);

export const AddToCartProductAction = createAction(
  '[PRODUCTS] ADD_TO_CART_ACTION',
  props<{ product: Product }>()
);
export const AddToCartProductSuccess = createAction(
  '[PRODUCTS] ADD_TO_CART_SUCCEESS',
  props<{ product: Product }>()
);
export const AddToCartProductError = createAction(
  '[PRODUCTS] ADD_TO_CART_ERROR',
  props<{ error: Error | string }>()
);
