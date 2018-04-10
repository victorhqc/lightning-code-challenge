import sumBy from 'lodash/sumBy';

export const expect = value => ({
  toBe: (expected) => {
    if (value !== expected) {
      throw new Error(`expected \`${expected}\` to be \`${value}\``);
    }

    return true;
  },

  toBeTruthy: () => {
    if (!value) {
      throw new Error(`expected \`${value}\` to be truthy`);
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
