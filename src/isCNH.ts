const isCNH = ( value: string | number ): boolean => {
  value = (''+value).replace(/[\.\-\/]+/g, "");
  if (!value || value.length !== 11 || value.match(/(\d)\1{10}/)) return false;

  let factor = 9;
  let sumDv1 = 0;
  let aux = 0;
  const dv1 = +value.charAt(9);
  const dv2 = +value.charAt(10);

  for(let i = 0; i <= 8; i++) {
    sumDv1 += (+value.charAt(i) * factor);
    factor--;
  }

  let dv1Valid = sumDv1 % 11;
  if (dv1Valid >= 10) {
    dv1Valid = 0;
    aux = 2;
  }

  if(dv1 !== dv1Valid){ return false; }

  let sumDv2 = 0;
  factor = 1;
  for(let i = 0; i <= 8; i++) {
    sumDv2 += (+value.charAt(i) * factor);
    factor++;
  }

  let dv2Valid = sumDv2 % 11;
  dv2Valid = dv2Valid >= 10 ? 0 : dv2Valid - aux;

  if(dv2 !== dv2Valid){ return false;}

  return true;

}

export default isCNH;
