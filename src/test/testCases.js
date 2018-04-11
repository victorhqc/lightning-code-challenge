import {
  describe,
  it,
  expect,
  parseTextToCode,
} from '../__internals/utils/evaluateCode';

const testCases = code => describe('Foo test', () => {
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

export default testCases;
