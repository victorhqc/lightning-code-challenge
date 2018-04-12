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

    it('Should come from a Collection instance', () => {
      const collection = new Scope();
      expect(collection.constructor.name).toBe('Collection');
    }),

    it('add method exists', () => {
      const collection = new Scope();
      // collection.hasOwnProperty
      expect(typeof collection.add !== 'undefined').toBeTruthy();
    }),

    it('add should not be a property of Collection', () => {
      const collection = new Scope();

      expect(typeof collection.add !== 'undefined').toBeTruthy();
      // collection.hasOwnProperty
      expect(!Object.prototype.hasOwnProperty.call(collection, 'add')).toBeTruthy();
    }),

    it('add() should save a value', () => {
      const collection = new Scope();

      collection.add('foo', 'bar');
      expect(collection.foo).toBe('bar');
    }),

    it('get method exists', () => {
      const collection = new Scope();
      // collection.hasOwnProperty
      expect(typeof collection.get !== 'undefined').toBeTruthy();
    }),

    it('get should not be a property of Collection', () => {
      const collection = new Scope();

      expect(typeof collection.get !== 'undefined').toBeTruthy();
      // collection.hasOwnProperty
      expect(!Object.prototype.hasOwnProperty.call(collection, 'get')).toBeTruthy();
    }),

    it('get() should save a value', () => {
      const collection = new Scope();
      collection.foo = 'bar';

      collection.get('foo');
      expect(collection.foo).toBe('bar');
    }),

    it('remove method exists', () => {
      const collection = new Scope();
      // collection.hasOwnProperty
      expect(typeof collection.remove !== 'undefined').toBeTruthy();
    }),

    it('remove should not be a property of Collection', () => {
      const collection = new Scope();

      expect(typeof collection.remove !== 'undefined').toBeTruthy();
      // collection.hasOwnProperty
      expect(!Object.prototype.hasOwnProperty.call(collection, 'remove')).toBeTruthy();
    }),

    it('remove() should remove a value', () => {
      const collection = new Scope();
      collection.foo = 'bar';

      collection.remove('foo');
      expect(collection.foo).toBe(undefined);
    }),

    it('forEach method exists', () => {
      const collection = new Scope();
      // collection.hasOwnProperty
      expect(typeof collection.forEach !== 'undefined').toBeTruthy();
    }),

    it('forEach should not be a property of Collection', () => {
      const collection = new Scope();

      expect(typeof collection.forEach !== 'undefined').toBeTruthy();
      // collection.hasOwnProperty
      expect(!Object.prototype.hasOwnProperty.call(collection, 'forEach')).toBeTruthy();
    }),
  ];
});

export const defaultCode = `// Do not edit anything outside this scope.
function test() {
    // Your code goes here. Feel free to add as many functions as you see fit.
    // But make sure you're returning the code from this function.
    // i.e. return myFunction;

}`;
