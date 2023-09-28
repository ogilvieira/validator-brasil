const isCPF = ( value: string | number ): boolean => {
  value = (''+value).replace(/[\.\-\/]+/g, "");

  if (value == "") return false;

  if (
    value.length != 11 ||
    value == "00000000000" ||
    value == "11111111111" ||
    value == "22222222222" ||
    value == "33333333333" ||
    value == "44444444444" ||
    value == "55555555555" ||
    value == "66666666666" ||
    value == "77777777777" ||
    value == "88888888888" ||
    value == "99999999999"
  )
    return false;

  var add = 0;
  for (var i = 0; i < 9; i++) add += parseInt(value.charAt(i)) * (10 - i);
  var rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(value.charAt(9))) return false;

  add = 0;

  for (var i = 0; i < 10; i++) add += parseInt(value.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(value.charAt(10))) return false;
  return true;
}


export default isCPF;
