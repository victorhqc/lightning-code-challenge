import {
  describe,
  it,
  expect,
} from '../__internals/utils/evaluateCode';

const testCases = test => describe('Foo test', () => [
  it('Should be foo', () => {
    expect(test()).toBe('foo');
  }),
]);

export default testCases;
