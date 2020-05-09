import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared';

export const LoadProductsAction = createAction(
  '[LOAD_PRODUCTS_ACTION]'
);
export const LoadProductsSuccess = createAction(
  '[LOAD_PRODUCTS_SUCCEESS]',
  props<{ products: Product[] }>()
);
export const LoadProductsError = createAction(
  '[LOAD_PRODUCTS_ERROR]',
  props<{ error: Error | string }>()
);

export const LoadProductAction = createAction(
  '[LOAD_PRODUCT_ACTION]',
  props<{ sku: string }>()
);
export const LoadProductSuccess = createAction(
  '[LOAD_PRODUCT_SUCCEESS]',
  props<{ product: Product }>()
);
export const LoadProductError = createAction(
  '[LOAD_PRODUCT_ERROR]',
  props<{ error: Error | string }>()
);

export const UpdateProductAction = createAction(
  '[UPDATE_PRODUCT_ACTION]',
  props<{ product: Product }>()
);
export const UpdateProductSuccess = createAction(
  '[UPDATE_PRODUCT_SUCCEESS]',
  props<{ product: Product }>()
);
export const UpdateProductsError = createAction(
  '[UPDATE_PRODUCTS_ERROR]',
  props<{ error: Error | string }>()
);

export const CreateProductAction = createAction(
  '[CREATE_PRODUCT_ACTION]',
  props<{ product: Product }>()
);
export const CreateProductSuccess = createAction(
  '[CREATE_PRODUCT_SUCCEESS]',
  props<{ product: Product }>()
);
export const CreateProductsError = createAction(
  '[CREATE_PRODUCT_ERROR]',
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

export const AddToCartAction = createAction(
  '[PRODUCT_ADD_TO_CART_ACTION]',
  props<{ product: Product }>()
);
export const AddToCartSuccess = createAction(
  '[PRODUCT_ADD_TO_CART_SUCCEESS]',
  props<{ product: Product }>()
);
export const AddToCartError = createAction(
  '[PRODUCT_ADD_TO_CART_ERROR]',
  props<{ error: Error | string }>()
);
