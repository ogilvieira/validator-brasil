import { isPlacaVeiculo } from './index';

const valids = ['JYC-8417', 'jyc8417', 'BRA2E19', 'bra 2e19'];
const invalids = ['JY-8417', 'JYC-841', 'JYC84171', '1YC8417', 'BRA2E1A', 'BRAE219', '']
const withFormat: [string, 'antiga' | 'mercosul', boolean][] = [
  ['JYC-8417', 'antiga', true],
  ['JYC-8417', 'mercosul', false],
  ['BRA2E19', 'mercosul', true],
  ['BRA2E19', 'antiga', false]
];

describe("Placa de Veículo validation", () => {
  test.each(valids)("the input %p should be valid", (value) => {
    expect(isPlacaVeiculo(value)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (value) => {
    expect(isPlacaVeiculo(value)).toBeFalsy();
  })

  test.each(withFormat)("the input %p with format %p should be %p", (value, format, expected) => {
    expect(isPlacaVeiculo(value, { format })).toBe(expected);
  })

});
