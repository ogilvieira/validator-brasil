import { isChavePix } from './index';

const valids = [
  '123e4567-e89b-12d3-a456-426655440000',
  '123E4567-E89B-12D3-A456-426655440000',
  '14552586017',
  '00933180000164',
  '12ABC34501DE35',
  'fulano.silva@example.com.br',
  '+5511987654321'
];
const invalids = [
  '123e4567e89b12d3a456426655440000',
  '123e4567-e89g-12d3-a456-426655440000',
  'x123e4567-e89b-12d3-a456-426655440000',
  '145.525.860-17',
  '14552586018',
  '00933180000165',
  'fulano@',
  `${'a'.repeat(70)}@example.com`,
  '11987654321',
  '+0511987654321',
  ''
];
const typed: [string, string, boolean][] = [
  ['14552586017', 'cpf', true],
  ['14552586017', 'telefone', false],
  ['00933180000164', 'cnpj', true],
  ['fulano@example.com', 'email', true],
  ['fulano@example.com', 'cpf', false],
  ['+5511987654321', 'telefone', true],
  ['123e4567-e89b-12d3-a456-426655440000', 'aleatoria', true],
  ['14552586017', 'aleatoria', false]
];

describe("Chave Pix validation", () => {
  test.each(valids)("the input %p should be valid", (value) => {
    expect(isChavePix(value)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (value) => {
    expect(isChavePix(value)).toBeFalsy();
  })

  test.each(typed)("the input %p with type %p should be %p", (value, type, expected) => {
    expect(isChavePix(value, { type: type as any })).toBe(expected);
  })

});
