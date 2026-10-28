import { isRG } from './index';

const valids = ['35.181.674-4', '351816744', '24.678.135-X', '24.678.135-x', '246781300'];
const invalids = ['35.181.674-5', '11111111-1', '3518167', '35181674A', '']
const withUf: [string, string, boolean][] = [
  ['35.181.674-4', 'SP', true],
  ['35.181.674-5', 'sp', false],
  ['MG-12.345.678', 'MG', true],
  ['12.345.678', 'MG', true],
  ['1234567890', 'RS', true],
  ['12.345.678-9', 'RJ', true],
  ['1234', 'BA', false],
  ['123456789012345', 'PR', false],
  ['11111111', 'SC', false],
  ['MG-12.345.678', 'RJ', false],
  ['145.525.860-17', 'RJ', true],
  ['12345678', 'XX', false]
];

describe("RG validation", () => {
  test.each(valids)("the input %p should be valid", (value) => {
    expect(isRG(value)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (value) => {
    expect(isRG(value)).toBeFalsy();
  })

  test.each(withUf)("the input %p with uf %p should be %p", (value, uf, expected) => {
    expect(isRG(value, { uf })).toBe(expected);
  })

});
