/* eslint import/prefer-default-export: 0 */

import {
  testCases as parseArrayTestCases,
  defaultCode as parseArrayDefaultCode,
  instructions as parseArrayInstructions,
} from '../tests/parseArray';

import {
  testCases as collectionTestCases,
  defaultCode as collectionDefaultCode,
  instructions as collectionInstructions,
} from '../tests/collection';

export const TESTS = [
  {
    name: 'Parse Array',
    path: '/parse-array',
    instructions: parseArrayInstructions,
    testCases: parseArrayTestCases,
    defaultCode: parseArrayDefaultCode,
  },
  {
    name: 'Collection',
    path: '/collection',
    instructions: collectionInstructions,
    testCases: collectionTestCases,
    defaultCode: collectionDefaultCode,
  },
];
