import {
  describe,
  it,
  expect,
  parseTextToCode,
} from '../utils/evaluateCode';

export const instructions = `
# Collection

## Instructions
Write a **Collection** class that has the following methods:
- add: (key, value) returns the value.
- get: (key) returns the value assigned to that key.
- remove: (key) removes the value assigned to that key, returns true if succeeds, false if fails.
- forEach: (callback) the callback should be able to call _this.add, this.get, etc._

The **Collection** has to use the prototypal approach, and the _forEach_ method

feel free to use ES6 sugar that your browser supports.
`;

export const testCases = code => describe('Foo test', () => {
  const Scope = parseTextToCode(code)();

  return [
    it('Collection exists', () => {
      const collection = new Scope();
      expect(typeof collection).toBe('object');
    }),
  ];
});

export const defaultCode = `// Do not edit anything outside this scope.
function test() {
    // Your code goes here. Feel free to add as many functions as you see fit.
    // But make sure you're returning the code from this function.
    // i.e. return myFunction;

}`;
