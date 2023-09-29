import { isChavePix } from './index';

const valids = ['123e4567-e89b-12d3-a456-426655440000']
const invalids = ['123e4567e89b12d3a456426655440000', '123e4567-e89g-12d3-a456-426655440000']

describe("CNH validation", () => {
  test.each(valids)("the input %p should be valid", (value) => {
    expect(isChavePix(value)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (value) => {
    expect(isChavePix(value)).toBeFalsy();
  })

});
