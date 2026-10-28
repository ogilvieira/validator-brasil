const isCNS = ( value: string | number ): boolean => {
  value = (''+value).replace(/[\.\-\/\s]+/g, "");
  // definitivos começam com 1 ou 2; provisórios com 7, 8 ou 9
  if (!/^[12789]\d{14}$/.test(value)) return false;

  let sum = 0;
  for (let i = 0; i < 15; i++) {
    sum += +value.charAt(i) * (15 - i);
  }

  return sum % 11 === 0;
}


export default isCNS;
