import { reducer } from '..';
import {initialProductsState} from '../products.state';

describe('Products Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialProductsState, action);

      expect(result).toBe(initialProductsState);
    });
  });
});
