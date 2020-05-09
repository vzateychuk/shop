import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared';

export const loadProductsAction = createAction(
  '[LOAD_PRODUCTS_ACTION]'
);
export const loadProductsSuccess = createAction(
  '[LOAD_PRODUCTS_SUCCEESS]',
  props<{ products: Product[] }>()
);
export const loadProductsError = createAction(
  '[LOAD_PRODUCTS_ERROR]',
  props<{ error: Error | string }>()
);

export const loadProductAction = createAction(
  '[LOAD_PRODUCT_ACTION]',
  props<{ sku: string }>()
);
export const loadProductSuccess = createAction(
  '[LOAD_PRODUCT_SUCCEESS]',
  props<{ product: Product }>()
);
export const loadProductError = createAction(
  '[LOAD_PRODUCT_ERROR]',
  props<{ error: Error | string }>()
);

export const updateProductAction = createAction(
  '[UPDATE_PRODUCT_ACTION]',
  props<{ product: Product }>()
);
export const updateProductSuccess = createAction(
  '[UPDATE_PRODUCT_SUCCEESS]',
  props<{ product: Product }>()
);
export const updateProductsError = createAction(
  '[UPDATE_PRODUCTS_ERROR]',
  props<{ error: Error | string }>()
);

export const createProductAction = createAction(
  '[CREATE_PRODUCT_ACTION]',
  props<{ product: Product }>()
);
export const createProductSuccess = createAction(
  '[CREATE_PRODUCT_SUCCEESS]',
  props<{ product: Product }>()
);
export const createProductsError = createAction(
  '[CREATE_PRODUCT_ERROR]',
  props<{ error: Error | string }>()
);

export const deleteProductAction = createAction(
  '[DELETE_PRODUCT_ACTION]',
  props<{ product: Product }>()
);
export const deleteProductSuccess = createAction(
  '[DELETE_PRODUCT_SUCCEESS]',
  props<{ product: Product }>()
);
export const deleteProductsError = createAction(
  '[DELETE_PRODUCTS_ERROR]',
  props<{ error: Error | string }>()
);


export const buyProduct = createAction(
  '[Product] Buy Product (add to Cart)',
  props<{ product: Product }>()
);
