import { CartItem, CartItemModel } from 'src/app/cart/models';

export interface  CartState {
    data: ReadonlyArray<CartItem>;
    readonly error: Error | string;
}

export const initialCartState: CartState = {
    data: [
        new CartItemModel('NICEHAT', 29.99, 5)
    ],
    error: null
};
