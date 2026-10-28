const UF_CODES: Record<string, string> = {
  SP: '01', MG: '02', RJ: '03', RS: '04', BA: '05', PR: '06', CE: '07',
  PE: '08', SC: '09', GO: '10', MA: '11', PB: '12', PA: '13', ES: '14',
  PI: '15', RN: '16', AL: '17', MT: '18', MS: '19', DF: '20', SE: '21',
  AM: '22', RO: '23', AC: '24', AP: '25', RR: '26', TO: '27', ZZ: '28'
};

type Options = { uf?: string };

const isTituloEleitor = ( value: string | number, options: Options = {} ): boolean => {
  value = (''+value).replace(/[\.\-\/\s]+/g, "");
  if (!/^\d{12,13}$/.test(value) || value.match(/^(\d)\1+$/)) return false;

  const size = value.length;
  const ufCode = value.substring(size - 4, size - 2);
  if (+ufCode < 1 || +ufCode > 28) return false;
  if (options.uf && UF_CODES[options.uf.toUpperCase()] !== ufCode) return false;

  // SP (01) e MG (02): resto 0 vira DV 1
  const isSpMg = ufCode === '01' || ufCode === '02';
  const toDv = (rest: number): number => rest === 10 ? 0 : (rest === 0 && isSpMg ? 1 : rest);

  // pesos de 9 a 2 da direita para a esquerda, voltando a 9 no nono dígito
  let sum = 0;
  let weight = 9;
  for (let i = size - 5; i >= 0; i--) {
    sum += +value.charAt(i) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  const dv1 = toDv(sum % 11);
  const dv2 = toDv((+ufCode.charAt(0) * 7 + +ufCode.charAt(1) * 8 + dv1 * 9) % 11);

  return value.substring(size - 2) === ''+dv1+dv2;
}


export default isTituloEleitor;
