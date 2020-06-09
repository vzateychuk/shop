import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';
import { selectRouterState } from './../router';
import { Product, ProductModel } from 'src/app/shared';

export const productsStateSelector
    = createFeatureSelector<ProductsState>('productsState');

export const selectProductsData =
    createSelector(productsStateSelector, (state: ProductsState) => state.data);
export const selectProductsStateError =
    createSelector(productsStateSelector, (state: ProductsState) => state.error);
export const selectProductLoaded =
    createSelector(productsStateSelector, (state: ProductsState) => state.loaded);

export const getProductByUrl = createSelector(
    selectProductsData,
    selectRouterState,
    (products, router): Product => {
        const sku = router.state.params.sku;
        if (sku && Array.isArray(products)) {
            return products.find(p => p.sku === sku);
        } else {
            return new ProductModel() as Product;
        }
    }
);
