import { ProductsState } from './products';
import { CartState } from './cart';
import { UsersState } from './users';

export interface AppState {
    productsState: ProductsState;
    cartState: CartState;
    users: UsersState;
}
