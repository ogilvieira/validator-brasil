const isRG = ( value: string | number ): boolean => {
  value = (''+value).replace(/[\.\-\/\s]+/g, "").toUpperCase();
  if (!/^\d{8}[\dX]$/.test(value) || value.match(/^(\d)\1{8}$/)) return false;

  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += +value.charAt(i) * (i + 2);
  }

  const dv = 11 - sum % 11;
  const dvChar = dv === 10 ? 'X' : dv === 11 ? '0' : ''+dv;

  return value.charAt(8) === dvChar;
}


export default isRG;
