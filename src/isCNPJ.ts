// valor do caractere = código ASCII - 48 (0-9 => 0-9, A-Z => 17-42), conforme IN RFB nº 2.229/2024
const charValue = ( char: string ): number => char.charCodeAt(0) - 48;

const calcDv = ( value: string ): number => {
  let sum = 0;
  let weight = 2;
  for (let i = value.length - 1; i >= 0; i--) {
    sum += charValue(value.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

const isCNPJ = ( value: string | number ): boolean => {
  value = (''+value).replace(/[\.\-\/]+/g, "").toUpperCase();

  if (!/^[0-9A-Z]{12}\d{2}$/.test(value) || !!value.match(/^(\d)\1{13}$/)) return false;

  const base = value.substring(0, 12);
  const dv1 = calcDv(base);
  const dv2 = calcDv(base + dv1);

  return value.substring(12) === ''+dv1+dv2;
}


export default isCNPJ;
