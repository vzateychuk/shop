import { Product, ProductModel, Category } from 'src/app/shared';

export interface  ProductsState {
    data: ReadonlyArray<Product>;
}

export const initialProductsState: ProductsState = {
    data: [
        new ProductModel( 'MYSHOES', 'Black Running Shoes', Category.Durable, 3, 109.99 ),
        new ProductModel( 'NEATOJACKET', 'Blue Jacket', Category.Durable, 2, 238.99),
        new ProductModel( 'PANTS', 'My buiteful pants', Category.Durable, 4, 117.99 ),
        new ProductModel( 'NICEHAT', 'A Nice Black Hat', Category.Nondurable, 1, 29.99 )
    ]
};
