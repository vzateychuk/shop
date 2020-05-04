import { Category } from './category.enum';

export class ProductModel {
    constructor(
        public sku: string = null,
        public name: string = '',
        public category: Category = Category.Nondurable,
        public isAvailable: boolean = false,
        public description?: string,
        public price?: number
    ) {
        this.price = price || 0;
    }
}
