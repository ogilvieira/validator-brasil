import isCPF from './isCPF.js';
import isCNPJ from './isCNPJ.js';

// no Brasil, o Número de Identificação Fiscal é o CPF (pessoa física) ou o CNPJ (pessoa jurídica)
const isNIF = ( value: string | number ): boolean => isCPF(value) || isCNPJ(value);


export default isNIF;
