/* eslint import/prefer-default-export: 0 */

import {
  testCases as parseArrayTestCases,
  defaultCode as parseArrayDefaultCode,
  instructions as parseArrayInstructions,
} from '../tests/parseArray';

const appendTestPrefix = href => `/test${href}`;

export const TESTS = [
  {
    name: 'Parse Array',
    href: appendTestPrefix('/parse-array'),
    instructions: parseArrayInstructions,
    testCases: parseArrayTestCases,
    defaultCode: parseArrayDefaultCode,
  },
];
