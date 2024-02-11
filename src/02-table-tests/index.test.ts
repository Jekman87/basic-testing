import { simpleCalculator, Action } from './index';

const testCases = [
  // Addition
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 10, b: -5, action: Action.Add, expected: 5 },

  // Subtraction
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 10, b: 7, action: Action.Subtract, expected: 3 },
  { a: -3, b: 2, action: Action.Subtract, expected: -5 },

  // Multiplication
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: -4, b: 5, action: Action.Multiply, expected: -20 },
  { a: 0, b: 100, action: Action.Multiply, expected: 0 },

  // Division
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: -20, b: 4, action: Action.Divide, expected: -5 },

  // Exponentiation
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 4, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },

  // Invalid Action
  { a: 5, b: 3, action: 'hello', expected: null },

  // Invalid Arguments
  { a: 'test', b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should return ${expected} for ${action} action with ${a} and ${b}`, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toEqual(expected);
    });
  });
});
