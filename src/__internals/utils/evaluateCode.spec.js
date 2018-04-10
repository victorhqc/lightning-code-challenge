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
      }).toThrow('expected `bar` to be `foo`');
    });
  });

  describe('.toBeTruthy', () => {
    it('Should be successful when is truthy', () => {
      expect(evaluateExpect(true).toBeTruthy()).toBeTruthy();
    });

    it('Should fail when is not truthy', () => {
      expect(() => {
        evaluateExpect(false).toBeTruthy();
      }).toThrow('expected `false` to be truthy');
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
    expect(evaluateDescribe('something being tested', [
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
});
