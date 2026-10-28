const isCEP = ( value: string | number ): boolean => {
  value = (''+value).replace(/[\.\-\/]+/g, "");
  return /^[0-9]{8}$/.test(value);
}


export default isCEP;
