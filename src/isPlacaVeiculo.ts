type Options = { format?: 'antiga' | 'mercosul' };

const PATTERNS = {
  antiga: /^[A-Z]{3}\d{4}$/,
  mercosul: /^[A-Z]{3}\d[A-Z]\d{2}$/
};

const isPlacaVeiculo = ( value: string, options: Options = {} ): boolean => {
  value = (''+value).replace(/[\-\s]+/g, "").toUpperCase();

  if (options.format) return PATTERNS[options.format].test(value);
  return PATTERNS.antiga.test(value) || PATTERNS.mercosul.test(value);
}


export default isPlacaVeiculo;
