import { isNIF } from './index';

const valids = ['145.525.860-17', '14552586017', '00.933.180/0001-64', '12.ABC.345/01DE-35'];
const invalids = ['145.525.860-18', '00.933.180/0001-65', '664551142', '']

describe("NIF validation", () => {
  test.each(valids)("the input %p should be valid", (value) => {
    expect(isNIF(value)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (value) => {
    expect(isNIF(value)).toBeFalsy();
  })

});
