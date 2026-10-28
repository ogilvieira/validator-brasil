type Validator = (ie: string) => boolean;

const sum = (digits: string, weights: number[]): number =>
  digits.split('').reduce((acc, d, i) => acc + Number(d) * weights[i], 0);

// weights 2..max applied right to left, restarting after max
const cyclic = (length: number, max = 9): number[] =>
  Array.from({ length }, (_, i) => ((length - 1 - i) % (max - 1)) + 2);

// weights length+1..2 applied left to right
const descending = (length: number): number[] =>
  Array.from({ length }, (_, i) => length + 1 - i);

const mod11 = (digits: string, weights = cyclic(digits.length)): number => {
  const rest = sum(digits, weights) % 11;
  return rest < 2 ? 0 : 11 - rest;
};

const mod11Minus10 = (digits: string, weights = cyclic(digits.length)): number =>
  (11 - (sum(digits, weights) % 11)) % 10;

const twoDigits = (ie: string, size: number, weigh = cyclic): boolean => {
  const base = ie.slice(0, size);
  const d1 = mod11(base, weigh(size));
  const d2 = mod11(base + d1, weigh(size + 1));
  return ie === `${base}${d1}${d2}`;
};

const oneDigit = (pattern: RegExp, weigh = cyclic): Validator => (ie) => {
  if (!pattern.test(ie)) return false;
  const base = ie.slice(0, -1);
  return ie === `${base}${mod11(base, weigh(base.length))}`;
};

const ap: Validator = (ie) => {
  if (!/^03\d{7}$/.test(ie)) return false;
  const base = ie.slice(0, 8);
  const n = Number(base);
  const [p, d] = n <= 3017000 ? [5, 0] : n <= 3019022 ? [9, 1] : [0, 0];
  const dv = 11 - ((p + sum(base, cyclic(8))) % 11);
  return Number(ie[8]) === (dv === 10 ? 0 : dv === 11 ? d : dv);
};

const ba: Validator = (ie) => {
  if (!/^\d{8,9}$/.test(ie)) return false;
  const modulus = '679'.includes(ie[ie.length - 8]) ? 11 : 10;
  const dv = (digits: string) => {
    const rest = sum(digits, descending(digits.length)) % modulus;
    return rest === 0 || (modulus === 11 && rest === 1) ? 0 : modulus - rest;
  };
  const base = ie.slice(0, -2);
  const d2 = dv(base);
  return ie === `${base}${dv(base + d2)}${d2}`;
};

const go: Validator = (ie) => {
  if (!/^(1[015]|2\d)\d{7}$/.test(ie)) return false;
  const base = ie.slice(0, 8);
  if (base === '11094402') return /[01]/.test(ie[8]);
  const n = Number(base);
  const rest = sum(base, cyclic(8)) % 11;
  const dv = rest === 0 ? 0 : rest === 1 ? Number(n >= 10103105 && n <= 10119997) : 11 - rest;
  return Number(ie[8]) === dv;
};

const mg: Validator = (ie) => {
  if (!/^\d{13}$/.test(ie)) return false;
  const padded = `${ie.slice(0, 3)}0${ie.slice(3, 11)}`;
  const total = padded
    .split('')
    .map((d, i) => String(Number(d) * (i % 2 + 1)))
    .join('')
    .split('')
    .reduce((acc, d) => acc + Number(d), 0);
  const d1 = (10 - (total % 10)) % 10;
  const base = ie.slice(0, 11) + d1;
  return ie === `${base}${mod11(base, cyclic(12, 11))}`;
};

const pe: Validator = (ie) => {
  if (/^\d{9}$/.test(ie)) return twoDigits(ie, 7);
  if (!/^\d{14}$/.test(ie)) return false;
  const base = ie.slice(0, 13);
  return ie === `${base}${mod11Minus10(base, [5, 4, 3, 2, 1, 9, 8, 7, 6, 5, 4, 3, 2])}`;
};

const ro: Validator = (ie) => {
  if (/^\d{9}$/.test(ie)) return Number(ie[8]) === mod11Minus10(ie.slice(3, 8));
  return /^\d{14}$/.test(ie) && Number(ie[13]) === mod11Minus10(ie.slice(0, 13));
};

const rr: Validator = (ie) =>
  /^24\d{7}$/.test(ie) && sum(ie.slice(0, 8), [1, 2, 3, 4, 5, 6, 7, 8]) % 9 === Number(ie[8]);

const SP_WEIGHTS = [1, 3, 4, 5, 6, 7, 8, 10];
const sp: Validator = (ie) => {
  const spDigit = (digits: string, weights: number[]) => (sum(digits, weights) % 11) % 10;
  if (/^P0\d{11}$/.test(ie)) return Number(ie[9]) === spDigit(ie.slice(1, 9), SP_WEIGHTS);
  if (!/^\d{12}$/.test(ie)) return false;
  return Number(ie[8]) === spDigit(ie.slice(0, 8), SP_WEIGHTS)
    && Number(ie[11]) === spDigit(ie.slice(0, 11), [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
};

const nineDigits = oneDigit(/^\d{9}$/);

const to: Validator = (ie) => {
  if (/^\d{9}$/.test(ie)) return nineDigits(ie);
  if (!/^\d{2}(0[123]|99)\d{7}$/.test(ie)) return false;
  return Number(ie[10]) === mod11(ie.slice(0, 2) + ie.slice(4, 10));
};

const validators: Record<string, Validator> = {
  AC: (ie) => /^01\d{11}$/.test(ie) && twoDigits(ie, 11),
  AL: oneDigit(/^24\d{7}$/),
  AP: ap,
  AM: nineDigits,
  BA: ba,
  CE: nineDigits,
  DF: (ie) => /^\d{13}$/.test(ie) && twoDigits(ie, 11),
  ES: nineDigits,
  GO: go,
  MA: oneDigit(/^12\d{7}$/),
  MT: oneDigit(/^\d{11}$/),
  MS: oneDigit(/^(28|50)\d{7}$/),
  MG: mg,
  PA: oneDigit(/^(15|7[5-9])\d{7}$/),
  PB: nineDigits,
  PR: (ie) => /^\d{10}$/.test(ie) && twoDigits(ie, 8, (n) => cyclic(n, 7)),
  PE: pe,
  PI: nineDigits,
  RJ: oneDigit(/^\d{8}$/, (n) => cyclic(n, 7)),
  RN: oneDigit(/^20\d{7,8}$/, descending),
  RS: oneDigit(/^\d{10}$/),
  RO: ro,
  RR: rr,
  SC: nineDigits,
  SP: sp,
  SE: nineDigits,
  TO: to,
};

const isInscricaoEstadual = (value: string | number, options: { uf: string }): boolean => {
  const validate = validators[String(options?.uf ?? '').toUpperCase()];
  const ie = String(value ?? '').toUpperCase().replace(/[.\-/\s]+/g, '');
  return !!validate && validate(ie);
};

export default isInscricaoEstadual;
