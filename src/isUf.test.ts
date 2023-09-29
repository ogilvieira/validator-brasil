import { isUF } from './index';

const valids = ['AC','AL','AP','AM','BA','CE','DF','ES','go','ma','ms','mt','mg','pa','pb','pr','pe','pi','rj','rn','rs','ro','rr','sc','sp','se','to']
const invalids = ['00', 'us', 'spa']

describe("CNH validation", () => {
  test.each(valids)("the input %p should be valid", (value) => {
    expect(isUF(value)).toBeTruthy();
  })

  test.each(invalids)("the input %p should be invalid", (value) => {
    expect(isUF(value)).toBeFalsy();
  })

});
