import {
  describe,
  it,
  expect,
  parseTextToCode,
} from '../utils/evaluateCode';

export const instructions = `
## Parse Array

### Introduction
Follow the instructions to write the piece of code instructed. The more
tests it passes, the better score you'll get.

### Objective
Your code needs to pass as many unit tests as possible. You don't need to
write them, they are already ready for you, so no need to do anything there.
Just focus on finishing as much as possible.

### Instructions
Write a function called **parseElements** that receive an array of objects and
applies the following rules:
- The elements inside the new arrays should be ordered by name.
- The elements that have **isActive** as false, should not be included.
- It returns a new object with keys based in the element's type, i.e.
  \`\`\`js
  var array = [{type: 'foo'}, {type: 'bar'}];
  // returns
  var parsedObject = {
    foo: [{ type: 'foo' }],
    bar: [{ type: 'bar' }]
  };
  \`\`\`
- No mutations should exist.

_Additional Notes: Use any additional function you see fit to accomplish the result._
`;

export const testCases = code => describe('Foo test', () => {
  const parsedCode = parseTextToCode(code)();

  return [
    it('Should create object from array', () => {
      const elements = [
        { type: 'dessert', name: 'Ice cream', isActive: true },
        { type: 'fruit', name: 'banana', isActive: true },
        { type: 'dessert', name: 'Ice cream', isActive: true },
        { type: 'fruit', name: 'banana', isActive: true },
      ];

      const expectedResult = {
        dessert: [
          { type: 'dessert', name: 'Ice cream', isActive: true },
          { type: 'dessert', name: 'Ice cream', isActive: true },
        ],
        fruit: [
          { type: 'fruit', name: 'banana', isActive: true },
          { type: 'fruit', name: 'banana', isActive: true },
        ],
      };

      expect(parsedCode(elements)).toEqual(expectedResult);
    }),

    it('Should order elements by name', () => {
      const elements = [
        { type: 'dessert', name: 'Macaron', isActive: true },
        { type: 'fruit', name: 'Papaya', isActive: true },
        { type: 'dessert', name: 'Apple Tarte tatin', isActive: true },
        { type: 'fruit', name: 'Banana', isActive: true },
      ];

      const expectedResult = {
        dessert: [
          { type: 'dessert', name: 'Apple Tarte tatin', isActive: true },
          { type: 'dessert', name: 'Macaron', isActive: true },
        ],
        fruit: [
          { type: 'fruit', name: 'Banana', isActive: true },
          { type: 'fruit', name: 'Papaya', isActive: true },
        ],
      };

      expect(parsedCode(elements)).toEqual(expectedResult);
    }),

    it('Should filter by `isActive`', () => {
      const elements = [
        { type: 'dessert', name: 'Macaron', isActive: false },
        { type: 'fruit', name: 'Papaya', isActive: false },
        { type: 'dessert', name: 'Apple Tarte tatin', isActive: true },
        { type: 'fruit', name: 'Banana', isActive: true },
      ];

      const expectedResult = {
        dessert: [
          { type: 'dessert', name: 'Apple Tarte tatin', isActive: true },
        ],
        fruit: [
          { type: 'fruit', name: 'Banana', isActive: true },
        ],
      };

      expect(parsedCode(elements)).toEqual(expectedResult);
    }),
  ];
});

export const defaultCode = `// Do not edit anything outside this scope.
function test() {
    // Your code goes here. Feel free to add as many functions as you see fit.
    function parseElements() {
    }

    return parseElements;
}`;
