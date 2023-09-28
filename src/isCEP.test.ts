import { isCEP } from './index';

describe("cep validation", () => {
  it("should return true to valid cep without hyphen", () => {
    expect(isCEP("14710130")).toBeTruthy();
  });

  it("should return true to invalid cep with 0 in the initial", () => {
    expect(isCEP("04710130")).toBeTruthy();
  });

  it("should return true to valid cep WITH hyphen", () => {
    expect(isCEP("54710-130")).toBeTruthy();
  });

  it("should return true to valid cep WITHOUT hyphen", () => {
    expect(isCEP("54710130")).toBeTruthy();
  });

  it("should return false to invalid cep", () => {
    expect(isCEP("5471012023")).toBeFalsy()
  });
});
