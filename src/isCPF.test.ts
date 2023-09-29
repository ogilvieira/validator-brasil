import { isCPF } from './index';

const valids = ['14552586017', '145.525.860-17', '15598590590', '485.040.718-80', '18772203536', '30792967291', '84053241600'];
const invalids = ['33333333333', '22222222222', '00011122233', '84053241601']

describe("CPF validation", () => {
  test.each(valids)("the input %p should be valid", (value) => {
    expect(isCPF(value)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (value) => {
    expect(isCPF(value)).toBeFalsy();
  })

});
