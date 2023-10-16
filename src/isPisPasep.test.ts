import { isPisPasep } from './index';

const valids = ['906.14184.32-6', '35632770590', '76962363944', '06802011291'];
const invalids = ['00000000000', '76962363934', '06802011292', '35632770589'];

describe("PIS/PASEP validation", () => {
  test.each(valids)("the number %p should be valid", (value) => {
    expect(isPisPasep(value)).toBeTruthy();
  })

  test.each(invalids)("the number %p should be invalid", (value) => {
    expect(isPisPasep(value)).toBeFalsy();
  })

});
