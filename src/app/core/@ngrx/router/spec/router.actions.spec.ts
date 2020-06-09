import * as fromRouter from '../router.actions';

describe('loadRouters', () => {
  it('should return an action', () => {
    expect(fromRouter.loadRouters().type).toBe('[Router] Load Routers');
  });
});
