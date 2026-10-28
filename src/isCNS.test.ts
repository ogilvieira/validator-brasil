import { isCNS } from './index';

const valids = ['137 2766 6992 0001', '137276669920001', '700000000000005', '898000000000002'];
const invalids = ['137276669920002', '337276669920001', '13727666992000', '000000000000000', '']

describe("CNS validation", () => {
  test.each(valids)("the input %p should be valid", (value) => {
    expect(isCNS(value)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (value) => {
    expect(isCNS(value)).toBeFalsy();
  })

});
