import * as fromRouter from '../router.actions';

describe('loadRouters', () => {
  it('should return an action', () => {
    expect(fromRouter.go.type).toBe('[Router] GO');
  });
});
