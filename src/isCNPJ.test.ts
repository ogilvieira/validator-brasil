import { isCNPJ } from './index';

describe("cnpj validation", () => {
  it("should return true to valid cnpj without hyphen and points", () => {
    expect(isCNPJ("00933180000164")).toBeTruthy();
  });

  it("should return true to valid cnpj with hyphen and points", () => {
    expect(isCNPJ("00.933.180/0001-64")).toBeTruthy();
  });

  it("should return false with letters", () => {
    expect(isCNPJ("00933180000164a")).toBeFalsy();
  });

  it("should return false to invalid cnpj with hyphen and points", () => {
    expect(isCNPJ("001112220000133")).toBeFalsy();
  });

  it("should return false to invalid cnpj", () => {
    expect(isCNPJ("00000000000000")).toBeFalsy();
  });
});
