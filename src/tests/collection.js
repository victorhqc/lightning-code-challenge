import {
  describe,
  it,
  expect,
  parseTextToCode,
} from '../utils/evaluateCode';

export const instructions = `
# Collection

## Instructions
Write a function called **Collection** and implement the functionality needed to
be used like this example:
\`\`\`js
const collection = new Collection({
  name: 'test',
  email: 'hello@world',
});

collection.add('foo', 'bar');

collecion.get('foo');

collection.remove('foo');

collection.forEach(function(key) {
  this.get(key);
  this.remove(key);
});
\`\`\`

This is just an example of how your collection could be used. **You only need to write the
implementation, not the previous example.** The tests to evaluate the logic are already
implemented and running internally.

The **Collection** needs to have the following methods:
- **add:** (key, value) returns the value.
- **get:** (key) returns the value assigned to that key.
- **remove:** (key) removes the value assigned to that key, returns true if succeeds, false if fails.
- **forEach:** (callback) the callback should be able to call _this.add, this.get, etc._
`;

export const testCases = code => describe('Foo test', () => {
  const Collection = parseTextToCode(code)();

  return [
    it('Collection exists', () => {
      try {
        const collection = new Collection();
        expect(typeof collection).toBe('object');
      } catch (e) {
        throw new Error('**Collection** doesn\'t exist, make sure you\'re returning from the `test()` function');
      }
    }),

    it('collection is a Collection', () => {
      try {
        const collection = new Collection();
        expect(collection.constructor.name)
          .toBe('Collection');
      } catch (e) {
        throw new Error('Looks like **Collection** constructor name is not `Collection`');
      }
    }),

    it('Different `Collection` are different instances', () => {
      try {
        const collection = new Collection();
        const otherCollection = new Collection();
        expect(collection !== otherCollection).toBeTruthy();
      } catch (e) {
        throw new Error('Looks like two different `new Collection()` have the same reference');
      }
    }),

    it('.add() method exists', () => {
      const collection = new Collection();
      // collection.hasOwnProperty
      expect(typeof collection.add !== 'undefined')
        .toBeTruthy('**Collection** doesn\'t have a `.add()` method');
    }),

    it('.get() method exists', () => {
      const collection = new Collection();
      // collection.hasOwnProperty
      expect(typeof collection.get !== 'undefined')
        .toBeTruthy('**Collection** doesn\'t have a `.get()` method');
    }),

    it('.remove() method exists', () => {
      const collection = new Collection();
      // collection.hasOwnProperty
      expect(typeof collection.remove !== 'undefined')
        .toBeTruthy('**Collection** doesn\'t have a `.remove()` method');
    }),

    it('.forEach() method exists', () => {
      const collection = new Collection();
      // collection.hasOwnProperty
      expect(typeof collection.forEach !== 'undefined')
        .toBeTruthy('**Collection** doesn\'t have a `.forEach()` method');
    }),

    it('.add() should not be a property of Collection', () => {
      const collection = new Collection();

      expect(typeof collection.add !== 'undefined')
        .toBeTruthy('.add() doesn\'t exist');
      expect(!Object.prototype.hasOwnProperty.call(collection, 'add'))
        .toBeTruthy('Looks like `.add()` is a property, not a method');
    }),

    it('.add() should save a value', () => {
      const collection = new Collection();

      try {
        collection.add('foo', 'bar');
        expect(collection.foo)
          .toBe('bar', '`.add()` is not saving any value');
      } catch (e) {
        throw new Error('.add() doesn\'t exist');
      }
    }),

    it('get should not be a property of Collection', () => {
      const collection = new Collection();

      expect(typeof collection.get !== 'undefined').toBeTruthy();
      // collection.hasOwnProperty
      expect(!Object.prototype.hasOwnProperty.call(collection, 'get')).toBeTruthy();
    }),

    it('get() should save a value', () => {
      const collection = new Collection();
      collection.foo = 'bar';

      collection.get('foo');
      expect(collection.foo).toBe('bar');
    }),

    it('remove should not be a property of Collection', () => {
      const collection = new Collection();

      expect(typeof collection.remove !== 'undefined').toBeTruthy();
      // collection.hasOwnProperty
      expect(!Object.prototype.hasOwnProperty.call(collection, 'remove')).toBeTruthy();
    }),

    it('remove() should remove a value', () => {
      const collection = new Collection();
      collection.foo = 'bar';

      collection.remove('foo');
      expect(collection.foo).toBe(undefined);
    }),

    it('forEach should not be a property of Collection', () => {
      const collection = new Collection();

      expect(typeof collection.forEach !== 'undefined').toBeTruthy();
      // collection.hasOwnProperty
      expect(!Object.prototype.hasOwnProperty.call(collection, 'forEach')).toBeTruthy();
    }),

    it('Constructor should add keys in object', () => {
      const collection = new Collection({
        name: 'test',
        email: 'hello@world',
      });

      expect(collection.name).toBe('test');
      expect(collection.email).toBe('hello@world');
    }),

    it('Should not expose data to other instances', () => {
      const collection = new Collection();
      collection.add('name', 'test');
      collection.add('email', 'hello@world');

      const otherCollection = new Collection({
        name2: 'test2',
        email2: 'hello2@world',
      });

      expect(otherCollection.get('name')).toBe(undefined);
      expect(otherCollection.email).toBe(undefined);
    }),

    it('forEach() should allow use own methods in callback', () => {
      const collection = new Collection({
        name: 'test',
        email: 'hello@world',
      });

      expect(collection.get('name')).toBe('test');
      expect(collection.get('email')).toBe('hello@world');

      collection.forEach(function inForEach(key, value) {
        expect(this.get(key)).toBe(value);
        this.remove(key);
      });

      expect(collection.get('name')).toBe(undefined);
      expect(collection.get('email')).toBe(undefined);
    }),
  ];
});

export const defaultCode = `// Do not edit anything outside this scope.
function test() {
    // Your code goes here. Feel free to add as many functions as you see fit.
    // But make sure you're returning the code from this function.
    // i.e. return myFunction;

}`;
