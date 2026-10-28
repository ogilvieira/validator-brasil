const calcDv = ( value: string ): number => {
  let sum = 0;
  let multiplier = 32 - value.length;
  for (let i = 0; i < value.length; i++) {
    sum += +value.charAt(i) * multiplier;
    multiplier = multiplier === 10 ? 0 : multiplier + 1;
  }
  const rest = sum % 11;
  return rest === 10 ? 1 : rest;
}

const isCertidao = ( value: string | number ): boolean => {
  value = (''+value).replace(/[\.\-\/\s]+/g, "");
  if (!/^\d{32}$/.test(value) || value.match(/^(\d)\1{31}$/)) return false;

  const base = value.substring(0, 30);
  const dv1 = calcDv(base);
  const dv2 = calcDv(base + dv1);

  return value.substring(30) === ''+dv1+dv2;
}


export default isCertidao;
