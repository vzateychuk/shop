import * as fromProducts from './products.actions';

describe('loadProductss', () => {
  it('should return an action', () => {
    expect(fromProducts.loadProductsAction().type).toBe('[Products] Load Products');
  });
});
