import { isCEP } from './index';


const valids = ['14710130', '04710130', '54710130', '54710-130'];
const invalids = ['5471012023', '54710']

describe("CEP validation", () => {
  test.each(valids)("the input %p should be valid", (renavam) => {
    expect(isCEP(renavam)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (renavam) => {
    expect(isCEP(renavam)).toBeFalsy();
  })

});
