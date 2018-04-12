/* eslint no-new-func: 0 */

import sumBy from 'lodash/sumBy';
import isEqual from 'lodash/isEqual';
import indexOf from 'lodash/indexOf';

import toType from 'to-type';

const parseValue = (value) => {
  switch (toType(value)) {
    case 'array':
    case 'object':
      return `
\`\`\`js
${JSON.stringify(value, null, ' ')}
\`\`\`
`;
    default:
      return `**${value}**`;
  }
};

const expectedValueToBeExpected = (value, expected) =>
  `expected ${parseValue(value)} to be ${parseValue(expected)}`;

export const expect = value => ({
  toBe: (expected) => {
    if (value !== expected) {
      throw new Error(expectedValueToBeExpected(value, expected));
    }

    return true;
  },

  toBeTruthy: () => {
    if (!value) {
      throw new Error(expectedValueToBeExpected(value, 'truthy'));
    }

    return true;
  },

  toEqual: (expected) => {
    if (!isEqual(value, expected)) {
      throw new Error(expectedValueToBeExpected(value, expected));
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

const getDefaultOptions = () => ({
  evaluateOnce: false,
  ignoreTests: [],
});

const updateTestResultByOptions = (tests, options) => {
  const {
    evaluateOnce,
    ignoreTests,
  } = options;

  if (!evaluateOnce) {
    return tests;
  }

  return tests.map((test) => {
    if (indexOf(ignoreTests, test.name) < 0) {
      return {
        ...test,
        isIgnored: undefined,
      };
    }

    return {
      ...test,
      isFailed: false,
      isIgnored: true,
    };
  });
};

export const describe = (name, tests, options = getDefaultOptions()) => {
  const runnedTests = updateTestResultByOptions(tests(), options);
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
