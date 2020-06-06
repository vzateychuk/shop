import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '.';
import { CartItem } from 'src/app/cart/models';

export const cartStateSelector = createFeatureSelector<CartState>('cartState');

export const selectCartData = createSelector(
    cartStateSelector, (state: CartState) => state.data
);
