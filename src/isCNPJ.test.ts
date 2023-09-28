import { isCNPJ } from './index';

const valids = ['00933180000164', '00.933.180/0001-64', '93350666000150', '73312680000152'];
const invalids = ['00933180000164a', '001112220000133', '00000000000000', '83312680000152', '73312680000153']

describe("CPF validation", () => {
  test.each(valids)("the input %p should be valid", (renavam) => {
    expect(isCNPJ(renavam)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (renavam) => {
    expect(isCNPJ(renavam)).toBeFalsy();
  })

});
