import { createFeatureSelector } from '@ngrx/store';
import { CartState } from '.';

export const cartStateSelector = createFeatureSelector<CartState>('cartState');
