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

// const n1 = parseInt(arrNumbers[0]);
// const n2 = parseInt(arrNumbers[1]);
// const n3 = parseInt(arrNumbers[2]);
// const n4 = parseInt(arrNumbers[3]);
// const n5 = parseInt(arrNumbers[4]);
// const n6 = parseInt(arrNumbers[5]);
// const n7 = parseInt(arrNumbers[6]);
// const n8 = parseInt(arrNumbers[7]);
// const n9 = parseInt(arrNumbers[8]);
// const dv1 = parseInt(arrNumbers[9]);
// const dv2 = parseInt(arrNumbers[10]);

// let aux = 0;

// const sumDv1 = n1 * 9 + n2 * 8 + n3 * 7 + n4 * 6 + n5 * 5 + n6 * 4 + n7 * 3 + n8 * 2 + n9 * 1;
// let dv1Valid = sumDv1 % 11;
// if (dv1Valid >= 10) {
//     dv1Valid = 0;
//     aux = 2;
// }

// const sumDv2 = n1 * 1 + n2 * 2 + n3 * 3 + n4 * 4 + n5 * 5 + n6 * 6 + n7 * 7 + n8 * 8 + n9 * 9;
// let dv2Valid = sumDv2 % 11;
// dv2Valid = dv2Valid >= 10
//     ? 0
//     : dv2Valid - aux;

// if (dv1 !== dv1Valid || dv2 !== dv2Valid) {
//     responseValidateCnh("invalid");
//     return;
// }
