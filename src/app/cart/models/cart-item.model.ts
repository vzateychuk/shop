export class CartItemModel {
    constructor(
        public sku: string,
        public price: number,
        public amount?: number
    ) {
        this.amount = amount || 1;
    }
}
