export interface Order {
    customer?: string;
    phone?: string;
    email?: string;
    selfDelivery?: boolean;
    address?: string;
}
export class OrderModel implements Order {
    constructor(
        public customer: string = 'unknown',
        public phone: string = '',
        public email: string = '',
        public selfDelivery?: boolean,
        public address: string = '',
) {
        this.selfDelivery = selfDelivery || true;
    }
}
