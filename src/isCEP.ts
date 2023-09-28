const isCEP = ( value: string | number ): boolean => {
  value = (''+value).replace(/[\.\-\/]+/g, "");
  return /^[0-9]{8}$/g.test(value);
}


export default isCEP;
