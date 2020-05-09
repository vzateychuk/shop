import { ProductsState } from './products';
import { CartState } from './cart';

export interface AppState {
    productsState: ProductsState;
    cartState: CartState;
}
