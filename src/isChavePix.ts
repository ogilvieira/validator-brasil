import isCPF from './isCPF';
import isCNPJ from './isCNPJ';

type ChavePixType = 'cpf' | 'cnpj' | 'email' | 'telefone' | 'aleatoria';
type Options = { type?: ChavePixType };

const VALIDATORS: Record<ChavePixType, (value: string) => boolean> = {
  cpf: (value) => /^\d{11}$/.test(value) && isCPF(value),
  cnpj: (value) => /^[0-9A-Z]{12}\d{2}$/.test(value) && isCNPJ(value),
  email: (value) => value.length <= 77 && /^[a-z0-9.!#$&'*+\/=?^_`{|}~-]+@[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(value),
  telefone: (value) => /^\+[1-9]\d{1,14}$/.test(value),
  aleatoria: (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
};

const isChavePix = ( value: string, options: Options = {} ): boolean => {
  value = (''+value).trim();

  if (options.type) return VALIDATORS[options.type](value);
  return Object.values(VALIDATORS).some((validate) => validate(value));
}


export default isChavePix;
