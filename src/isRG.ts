import isCPF from './isCPF.js';
import isUF from './isUF.js';

type Options = { uf?: string };

// padrão SSP-SP: 8 dígitos + DV (módulo 11, 10 => X)
const isRGSP = ( value: string ): boolean => {
  if (!/^\d{8}[\dX]$/.test(value) || value.match(/^(\d)\1{8}$/)) return false;

  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += +value.charAt(i) * (i + 2);
  }

  const dv = 11 - sum % 11;
  const dvChar = dv === 10 ? 'X' : dv === 11 ? '0' : ''+dv;

  return value.charAt(8) === dvChar;
}

// demais UFs não publicam algoritmo de DV: só formato (sigla opcional + 5 a 14 dígitos)
const isRGFormat = ( value: string, uf: string ): boolean => {
  if (value.startsWith(uf)) value = value.substring(uf.length);
  return /^\d{4,13}[\dX]$/.test(value) && !value.match(/^(\d)\1+$/);
}

const isRG = ( value: string | number, options: Options = {} ): boolean => {
  value = (''+value).replace(/[\.\-\/\s]+/g, "").toUpperCase();
  const uf = (options.uf || 'SP').toUpperCase();

  if (!isUF(uf)) return false;
  // Carteira de Identidade Nacional (CIN) usa o CPF como número
  if (options.uf && isCPF(value)) return true;

  return uf === 'SP' ? isRGSP(value) : isRGFormat(value, uf);
}


export default isRG;
