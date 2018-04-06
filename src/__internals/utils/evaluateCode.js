export const expect = value => ({
  toBe: (expected) => {
    if (value !== expected) {
      return {
        isFailed: true,
        error: `expected ${expected} to be ${value}`,
      };
    }

    return {
      isFailed: false,
    };
  },
});

const it = (name, callback) => {

};

const describe = (name, callback) => {
  const result = callback();

  return {
    ...result,
    name,
  };
};

const TESTS_V2 = des

const TESTS = [
  {
    id: 'foo',
    functionName: 'test',
    title: 'Should do foo',
    check: (callback) => {
      const result = callback();

      return {
        didTestPass: result === 'foo',
        result,
      };
    },
  },
  {
    id: 'pushq',
    functionName: 'test',
    title: 'Should do pushq',
    check: (callback) => {
      const result = callback();

      return {
        didTestPass: result === 'pushq',
        result,
      };
    },
  },
];

const assertTest = (test, code) => {

};

const evaluateCode = code => TESTS.reduce(
  (prev, test) => {
    const result = test.check(code[test.functionName]);
    const totalTests = prev.totalTests + 1;
    const testsPassed = result.didTestPass ? prev.testsPassed + 1 : prev.testsPassed;
    const ratio = testsPassed / totalTests;

    return {
      totalTests,
      testsPassed,
      ratio,
      tests: [
        ...prev.tests,
        {
          id: test.id,
          title: test.title,
          ...result,
        },
      ],
    };
  },
  {
    totalTests: 0,
    testsPassed: 0,
    tests: [],
  },
);

export default evaluateCode;
