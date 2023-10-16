const isPisPasep = ( value: string | number ): boolean => {
  value = (''+value).replace(/[\.\-\/]+/g, "");
  if (value == "" || value.length !== 11 || !!value.match(/(\d)\1{10}/)) { return false };

  const baseMultipliers = "3298765432";
  let total = 0;
  let remainder = 0;
  let multiplying = 0;
  let multiplier = 0;
  let dig = 0;

  for (var i = 0; i < 10; i++) {
    multiplying = parseInt( value.substring( i, i + 1 ) );
    multiplier = parseInt( baseMultipliers.substring( i, i + 1 ) );
    total += multiplying * multiplier;
  }

  remainder = 11 - total % 11;
  remainder = remainder === 10 || remainder === 11 ? 0 : remainder;

  dig = parseInt("" + value.charAt(10));

  return remainder === dig;
}


export default isPisPasep;
