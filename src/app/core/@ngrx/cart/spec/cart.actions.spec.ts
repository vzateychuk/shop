import * as fromCart from '../cart.actions';

describe('loadCarts', () => {
  it('should return an action', () => {
    expect(fromCart.LoadCartItemsAction().type).toBe('[Cart] Load Carts');
  });
});
