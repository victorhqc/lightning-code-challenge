import {
  describe,
  it,
  expect,
} from '../__internals/utils/evaluateCode';

const testCases = code => describe('Foo test', () => {
  console.log('code', code);
  return [
    it('Should be foo', () => {
      expect(test()).toBe('foo');
    }),
  ];
});

export default testCases;
