const isRenavam = ( value: string | number ): boolean => {
  value = (''+value).replace(/[\.\-\/]+/g, "");
  if (!value || value.length !== 11 || value.match(/(\d)\1{10}/)) return false;


  let valueArr: number[] = value.split('').map(a => +a),
      factor: number = 2,
      sum: number = 0,
      dig: number = valueArr[10];

  for(let i = 0; i <= 9; i++) {
    sum += valueArr[9 - i] * factor;
    factor = factor === 9 ? 2 : factor+1;
  };

  const digValid = 11 - sum % 11;

  return dig === (digValid >= 10 ? 0 : digValid);

}
export default isRenavam;
