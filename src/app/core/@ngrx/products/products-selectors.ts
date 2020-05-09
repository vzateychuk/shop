import { createFeatureSelector } from '@ngrx/store';
import { ProductsState } from './products.state';

export const productsStateSelector = createFeatureSelector<ProductsState>('productsState');
