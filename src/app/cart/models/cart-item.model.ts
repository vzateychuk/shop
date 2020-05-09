export interface CartItem {
    sku: string;
    price: number;
    amount: number;
}

export class CartItemModel {
    constructor(
        public sku: string,
        public price: number,
        public amount: number
    ) {}
}
