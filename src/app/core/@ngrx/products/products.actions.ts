import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared';

export const loadProducts = createAction(
  '[Products] Load Products'
);

export const loadProduct = createAction(
  '[Product] Load Product',
  props<{ sku: string }>()
);

export const createProduct = createAction(
  '[Product] Create Product',
  props<{ product: Product }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ product: Product }>()
);

export const buyProduct = createAction(
  '[Product] Buy Product (add to Cart)',
  props<{ product: Product }>()
);
