import { isCNH } from './index';

const valids = ['36642593401', '09755072910', '89186762928', '89981579777'];
const invalids = ['00000000000', '00011122233', '89186762929']

describe("CNH validation", () => {
  test.each(valids)("the input %p should be valid", (value) => {
    expect(isCNH(value)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (value) => {
    expect(isCNH(value)).toBeFalsy();
  })

});
