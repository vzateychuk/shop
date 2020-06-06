import { CartItem, CartItemModel } from 'src/app/cart/models';

export interface  CartState {
    data: ReadonlyArray<CartItem>;
    readonly error: Error | string;
}

export const initialCartState: CartState = {
    data: [
        // new CartItemModel('NICEHAT', 29.99, 5),
        // new CartItemModel('MYSHOES', 111, 2),
        // new CartItemModel('PANTS', 27.4, 8)
    ],
    error: null
};
