import { isCNPJ } from './index';

const valids = ['00933180000164', '00.933.180/0001-64', '93350666000150', '73312680000152', '12ABC34501DE35', '12.ABC.345/01DE-35', '12.abc.345/01de-35'];
const invalids = ['00933180000164a', '001112220000133', '00000000000000', '83312680000152', '73312680000153', '12ABC34501DE36', '12ABC34501DEAB', '']

describe("CNPJ validation", () => {
  test.each(valids)("the input %p should be valid", (value) => {
    expect(isCNPJ(value)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (value) => {
    expect(isCNPJ(value)).toBeFalsy();
  })

});
