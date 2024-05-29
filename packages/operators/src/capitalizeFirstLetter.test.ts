import { capitalizeFirstLetter } from './capitalizeFirstLetter';

it('should capitalize first letter', () => {
  expect(capitalizeFirstLetter('hello')).toBe('Hello');
});

it('should return an empty line', () => {
  expect(capitalizeFirstLetter('')).toBe('');
});

it('should handle any wrong type', () => {
  const wrongInputs: any[] = [
    null,
    undefined,
    {},
    [],
    () => {},
    1,
    Symbol('test'),
  ];

  wrongInputs.forEach(
    (value) => expect(capitalizeFirstLetter(value)).toBe(''),
  );
});
