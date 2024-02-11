import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1, 2];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: null,
          next: null,
        },
      },
    };

    const generatedList = generateLinkedList(elements);

    expect(generatedList).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const elements = [1, 2];

    const generatedList = generateLinkedList(elements);

    expect(generatedList).toMatchSnapshot();
  });
});
