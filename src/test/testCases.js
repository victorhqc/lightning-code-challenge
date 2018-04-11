import {
  describe,
  it,
  expect,
  parseTextToCode,
} from '../__internals/utils/evaluateCode';

const testCases = code => describe('Foo test', () => {
  const parsedCode = parseTextToCode(code);
  return [
    it('Should be foo', () => {
      expect(parsedCode()).toBe('foo');
    }),
  ];
});

export default testCases;
