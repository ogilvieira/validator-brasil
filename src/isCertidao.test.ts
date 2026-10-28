import { isCertidao } from './index';

const valids = ['623584 01 55 2023 9 48814 529 8424277-49', '62358401552023948814529842427749'];
const invalids = ['62358401552023948814529842427748', '62358401552023948814529842427759', '6235840155202394881452984242774', '00000000000000000000000000000000', '']

describe("Certidão validation", () => {
  test.each(valids)("the input %p should be valid", (value) => {
    expect(isCertidao(value)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (value) => {
    expect(isCertidao(value)).toBeFalsy();
  })

});
