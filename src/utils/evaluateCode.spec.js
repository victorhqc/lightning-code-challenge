import {
  expect as evaluateExpect,
  it as evaluateIt,
  describe as evaluateDescribe,
} from './evaluateCode';

describe('expect', () => {
  describe('.toBe', () => {
    it('Should be successful when it matches', () => {
      expect(evaluateExpect('foo').toBe('foo')).toBeTruthy();
    });

    it('Should fail when it doesn\'t match', () => {
      expect(() => {
        evaluateExpect('foo').toBe('bar');
      }).toThrow('expected **foo** to be **bar**');
    });
  });

  describe('.toBeTruthy', () => {
    it('Should be successful when is truthy', () => {
      expect(evaluateExpect(true).toBeTruthy()).toBeTruthy();
    });

    it('Should fail when is not truthy', () => {
      expect(() => {
        evaluateExpect(false).toBeTruthy();
      }).toThrow('expected **false** to be **truthy**');
    });
  });

  describe('.toEqual', () => {
    it('Should be successful when objects match', () => {
      expect(evaluateExpect({
        foo: {
          bar: true,
        },
        hello: 'world',
      }).toEqual({
        foo: {
          bar: true,
        },
        hello: 'world',
      })).toBeTruthy();
    });

    it('Should fail when objects don\'t match', () => {
      const value = {
        foo: {
          bar: false,
        },
        hello: 'world',
      };

      const expected = {
        foo: {
          bar: true,
        },
        hello: 'world',
      };

      expect(() => {
        evaluateExpect(value).toEqual(expected);
      }).toThrow(`expected${' '}
\`\`\`js
${JSON.stringify(value, null, ' ')}
\`\`\`
${' '}to be${' '}
\`\`\`js
${JSON.stringify(expected, null, ' ')}
\`\`\`
`);
    });
  });
});

describe('it', () => {
  it('Should pass if internal `expect` pass', () => {
    const result = evaluateIt('some internal test', () => {
      evaluateExpect(true).toBeTruthy();
    });

    expect(result).toEqual({
      isFailed: false,
      error: '',
      name: 'some internal test',
    });
  });

  it('Should fail if internal `expect` fails', () => {
    expect(evaluateIt('some internal failed test', () => {
      throw new Error('oh no!');
    })).toEqual({
      isFailed: true,
      error: 'oh no!',
      name: 'some internal failed test',
    });
  });
});

describe('describe', () => {
  it('Should run a set of `it` and return its results in an array', () => {
    expect(evaluateDescribe('something being tested', () => [
      evaluateIt('something passes', () => {
        expect(true).toBe(true);
      }),
      evaluateIt('something fails', () => {
        throw new Error('oh no!');
      }),
    ])).toEqual({
      name: 'something being tested',
      tests: [
        {
          isFailed: false,
          error: '',
          name: 'something passes',
        },
        {
          isFailed: true,
          error: 'oh no!',
          name: 'something fails',
        },
      ],
      passedTests: 1,
      ratio: 1 / 2,
    });
  });

  it('Should not run a `it` when using option evaluateOnce', () => {
    const test = evaluateDescribe('something being tested', () => [
      evaluateIt('something passes', () => {
        expect(true).toBe(true);
      }),
      evaluateIt('something fails', () => {
        throw new Error('oh no!');
      }),
    ], {
      evaluateOnce: true,
      ignoreTests: [
        'something fails',
      ],
    });

    const expectedResult = {
      name: 'something being tested',
      tests: [
        {
          isFailed: false,
          error: '',
          name: 'something passes',
        },
        {
          isFailed: false,
          isIgnored: true,
          error: 'oh no!',
          name: 'something fails',
        },
      ],
      passedTests: 2,
      ratio: 1,
    };

    expect(test).toEqual(expectedResult);
  });
});
