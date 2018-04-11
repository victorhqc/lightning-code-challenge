/* eslint no-new-func: 0 */

import sumBy from 'lodash/sumBy';
import isEqual from 'lodash/isEqual';

export const expect = value => ({
  toBe: (expected) => {
    if (value !== expected) {
      throw new Error(`expected \`${value}\` to be \`${expected}\``);
    }

    return true;
  },

  toBeTruthy: () => {
    if (!value) {
      throw new Error(`expected \`${value}\` to be truthy`);
    }

    return true;
  },

  equals: (expected) => {
    if (!isEqual(value, expected)) {
      const error = `expected \`${JSON.stringify(value)}\` to be \`${JSON.stringify(expected)}\``;
      throw new Error(error);
    }

    return true;
  },
});

export const it = (name, callback) => {
  try {
    callback();

    return {
      name,
      error: '',
      isFailed: false,
    };
  } catch (e) {
    return {
      name,
      error: e.message,
      isFailed: true,
    };
  }
};

export const describe = (name, tests) => {
  const runnedTests = tests();
  const passedTests = sumBy(runnedTests, ({ isFailed }) => {
    if (isFailed) {
      return 0;
    }

    return 1;
  });

  return {
    name,
    tests: runnedTests,
    ratio: passedTests / runnedTests.length,
    passedTests,
  };
};

export const parseTextToCode = code => Function(`"use strict"; return (${code})`)();
