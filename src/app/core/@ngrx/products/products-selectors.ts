import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';

export const productsStateSelector
    = createFeatureSelector<ProductsState>('productsState');

export const selectProductsData =
    createSelector(productsStateSelector, (state: ProductsState) => state.data);
export const selectProductsStateError =
    createSelector(productsStateSelector, (state: ProductsState) => state.error);
export const selectSelectedProduct =
    createSelector(productsStateSelector, (state: ProductsState) => state.selectedProduct);
export const selectProductLoaded =
    createSelector(productsStateSelector, (state: ProductsState) => state.loaded);
