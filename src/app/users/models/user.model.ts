export interface User {
    sku: number;
    firstName: string;
    lastName: string;
  }

export class UserModel implements User {
    constructor(
        public sku: number,
        public firstName: string,
        public lastName: string
    ) {}
}
