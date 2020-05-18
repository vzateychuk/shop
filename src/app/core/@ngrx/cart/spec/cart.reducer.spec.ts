import { reducer } from '../cart.reducer';
import { initialCartState } from '../cart.state';

describe('Cart Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialCartState, action);

      expect(result).toBe(initialCartState);
    });
  });
});
