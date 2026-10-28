import { isRG } from './index';

const valids = ['35.181.674-4', '351816744', '24.678.135-X', '24.678.135-x', '246781300'];
const invalids = ['35.181.674-5', '11111111-1', '3518167', '35181674A', '']

describe("RG validation", () => {
  test.each(valids)("the input %p should be valid", (value) => {
    expect(isRG(value)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (value) => {
    expect(isRG(value)).toBeFalsy();
  })

});
