import { isTituloEleitor } from './index';

const valids = ['434028530132', '4340 2853 0132', '100000010116', '100000010213', '100000010302', '100000012801', '100000070302', '1234567890175', '1234 5678 9017 5', '1234567890272'];
const invalids = ['434028530133', '434028530122', '100000010100', '100000012901', '100000010000', '000000000000', '43402853013', '1234567890176', '1234567890302', '12345678901755', '']
const withUf: [string, string, boolean][] = [
  ['434028530132', 'SP', true],
  ['434028530132', 'sp', true],
  ['434028530132', 'MG', false],
  ['100000012801', 'ZZ', true],
  ['100000010302', 'XX', false],
  ['1234567890272', 'MG', true],
  ['1234567890272', 'SP', false]
];

describe("Título de Eleitor validation", () => {
  test.each(valids)("the input %p should be valid", (value) => {
    expect(isTituloEleitor(value)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (value) => {
    expect(isTituloEleitor(value)).toBeFalsy();
  })

  test.each(withUf)("the input %p with uf %p should be %p", (value, uf, expected) => {
    expect(isTituloEleitor(value, { uf })).toBe(expected);
  })

});
