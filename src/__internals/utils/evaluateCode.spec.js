import { expect as evaluateExpect } from './evaluateCode';

describe('expect', () => {
  describe('.toBe', () => {
    it('Should be successful when it matches', () => {
      const result = evaluateExpect('foo').toBe('foo');
      expect(result).toEqual({
        isFailed: false,
      });
    });
  });
});
