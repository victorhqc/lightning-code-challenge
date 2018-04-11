/* eslint no-new-func: 0 */

import {
  describe,
  it,
  expect,
} from '../__internals/utils/evaluateCode';

const parseTextToCode = code => Function(`"use strict"; return (${code})`)();

const testCases = code => describe('Foo test', () => {
  const parsedCode = parseTextToCode(code);
  return [
    it('Should be foo', () => {
      expect(parsedCode()).toBe('foo');
    }),
  ];
});

export default testCases;
