import { isRenavam } from './index';

const valids = ['00197073212', '71199648424', '62185388230'];
const invalids = ['33333333333', '22222222222', '71199648420', '7119964842']

describe("Renavam validation", () => {
  test.each(valids)("the number %p should be valid", (value) => {
    expect(isRenavam(value)).toBeTruthy();
  })

  test.each(invalids)("the number %p should be invalid", (value) => {
    expect(isRenavam(value)).toBeFalsy();
  })

});
