const isCPF = ( value: string | number ): boolean => {
  value = (''+value).replace(/[\.\-\/]+/g, "");
  if (value == "" || value.length !== 11 || !!value.match(/(\d)\1{10}/)) { return false };

  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(value.charAt(i - 1)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(value.charAt(9))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(value.charAt(i - 1)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(value.charAt(10))) return false;
  return true;
}


export default isCPF;
