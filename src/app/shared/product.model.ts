import { Category } from './category.enum';

export interface Product {
    sku: string;
    name: string;
    category: Category;
    amountAvailable: number;
    price: number;
    description?: string;
}

export class ProductModel implements Product {
    constructor(
        public sku: string = '',
        public name: string = '',
        public category: Category = Category.Nondurable,
        public amountAvailable: number = 1,
        public price: number = 0,
        public description?: string
    ) {
        this.description = description || '';
    }

}
