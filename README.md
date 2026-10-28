# validator-brasil

Validação de documentos e identificadores brasileiros, sem dependências e com tipagem TypeScript. Funciona sozinha ou como extensão do [validator.js](https://github.com/validatorjs/validator.js). 🇧🇷

[![Tests and Publish](https://github.com/ogilvieira/validator-brasil/actions/workflows/main.yml/badge.svg)](https://github.com/ogilvieira/validator-brasil/actions/workflows/main.yml)
[![npm-version](https://img.shields.io/npm/v/validator-brasil?color=brightgreen&label=npm%20package)](https://www.npmjs.com/package/validator-brasil)
[![downloads](https://img.shields.io/npm/dt/validator-brasil.svg)](https://www.npmjs.com/package/validator-brasil)

## Instalação

```bash
npm install validator-brasil
# ou
yarn add validator-brasil
```

## Uso

```typescript
import validatorBrasil from 'validator-brasil';

validatorBrasil.isCPF('045.462.356-90'); // true
```

Também é possível importar só o que for usar. O pacote funciona com ESM (`import`) e CommonJS (`require`):

```typescript
import { isCPF, isCNPJ } from 'validator-brasil';
import isCNH from 'validator-brasil/isCNH';
const { isRenavam } = require('validator-brasil');
```

Todos os métodos retornam `boolean`, nunca lançam exceção e aceitam o valor com ou sem pontuação (`.`, `-`, `/`).

## Métodos

| Método | Descrição | Exemplo válido |
|--------|-----------|----------------|
| `isCPF(value)` | CPF | `145.525.860-17` |
| `isCNPJ(value)` | CNPJ numérico e alfanumérico | `03.615.211/0001-27`, `12.ABC.345/01DE-35` |
| `isCEP(value)` | CEP (formato) | `18703-357` |
| `isCNH(value)` | CNH | `62312481179` |
| `isRenavam(value)` | Renavam (11 dígitos, ou 9 no formato antigo) | `11779918350` |
| `isUF(value)` | Sigla de estado brasileiro | `sp` |
| `isChavePix(value, { type? })` | Chave Pix de qualquer tipo | `+5511987654321` |
| `isPisPasep(value)` | PIS/PASEP/NIT | `888.18726.88-5` |
| `isRG(value, { uf? })` | RG (dígito verificador em SP, formato nas demais UFs) e CIN | `35.181.674-4` |
| `isTituloEleitor(value, { uf? })` | Título de Eleitor (12 dígitos, ou 13 em SP/MG) | `4340 2853 0132` |
| `isCertidao(value)` | Matrícula de certidão (nascimento, casamento, óbito) | `623584 01 55 2023 9 48814 529 8424277-49` |
| `isInscricaoEstadual(value, { uf })` | Inscrição Estadual dos 27 estados | `110.042.490.114` (SP) |
| `isPlacaVeiculo(value, { format? })` | Placa antiga ou Mercosul | `JYC-8417`, `BRA2E19` |
| `isCNS(value)` | Cartão Nacional de Saúde (SUS) | `137 2766 6992 0001` |
| `isNIF(value)` | Número de Identificação Fiscal (CPF ou CNPJ) | `145.525.860-17` |

### Detalhes

#### `isCNPJ`
Aceita o **CNPJ alfanumérico** (IN RFB nº 2.229/2024, emitido desde julho de 2026): as 12 primeiras posições podem ter letras de `A` a `Z`, e os 2 dígitos verificadores continuam numéricos. Letras minúsculas são aceitas.

```typescript
isCNPJ('12.ABC.345/01DE-35'); // true
```

#### `isChavePix`
Sem opções, aceita qualquer tipo de chave. Com `type`, valida só aquele tipo:

| `type` | Formato |
|--------|---------|
| `cpf` | 11 dígitos, sem pontuação |
| `cnpj` | 14 caracteres, sem pontuação (aceita alfanumérico) |
| `email` | e-mail com até 77 caracteres |
| `telefone` | formato E.164: `+5511987654321` |
| `aleatoria` | UUID (EVP): `123e4567-e89b-12d3-a456-426655440000` |

```typescript
isChavePix('fulano@example.com');                     // true
isChavePix('14552586017', { type: 'telefone' });      // false
```

#### `isRG`
Não existe algoritmo nacional para o RG: cada estado define o seu, e só São Paulo tem o cálculo do dígito verificador amplamente documentado.

- **Sem `uf`, ou com `uf: 'SP'`:** valida o padrão SSP-SP, com 8 dígitos + dígito verificador (que pode ser `X`).
- **Demais UFs:** valida só o formato: a sigla do estado opcional na frente (ex.: `MG-12.345.678`), de 5 a 14 caracteres numéricos (o último pode ser `X`) e sem todos os dígitos iguais. Isso não garante que o número exista.
- **Com `uf` informada:** também aceita a **Carteira de Identidade Nacional (CIN)**, que desde 2023 usa o CPF como número.

```typescript
isRG('35.181.674-4');                          // true (SP, com dígito verificador)
isRG('MG-12.345.678', { uf: 'MG' });           // true (formato)
isRG('145.525.860-17', { uf: 'RJ' });          // true (CIN)
```

#### `isTituloEleitor`
Valida os dígitos verificadores e o código de UF (as posições logo antes dos 2 dígitos verificadores). Com `{ uf }`, também confere se o título foi emitido naquele estado (`ZZ` = exterior).

Títulos antigos de SP e MG podem ter 13 dígitos (sequencial com 9 dígitos). O TSE não publica o cálculo desse formato; o método segue a convenção usada na prática, com pesos de 9 a 2 da direita para a esquerda e voltando a 9 no nono dígito.

#### `isInscricaoEstadual`
`uf` é obrigatório, porque cada estado tem a sua regra. Retorna `false` para `"ISENTO"`.

```typescript
isInscricaoEstadual('110.042.490.114', { uf: 'SP' }); // true
```

#### `isRenavam`
Aceita o Renavam atual (11 dígitos) e o antigo (9 dígitos), que equivale ao atual com `00` à esquerda.

#### `isNIF`
No Brasil, o Número de Identificação Fiscal é o CPF (pessoa física) ou o CNPJ (pessoa jurídica), e é o que formulários internacionais pedem como "NIF/TIN brasileiro". O método aceita qualquer um dos dois. Não valida NIF de outros países, como o de Portugal.

#### `isPlacaVeiculo`
`format` aceita `'antiga'` (`AAA9999`) ou `'mercosul'` (`AAA9A99`). Sem a opção, aceita os dois.

#### `isCEP`
Valida apenas o formato (8 dígitos). Para saber se o CEP existe, consulte um serviço como o ViaCEP.

## Integração com outras bibliotecas

### validator.js

```typescript
import validator from 'validator';
import validatorBrasil from 'validator-brasil';

const v = { ...validator, ...validatorBrasil };
v.isEmail('a@b.com') && v.isCPF('145.525.860-17');
```

### class-validator

```typescript
import { ValidateBy, ValidationOptions } from 'class-validator';
import { isCPF } from 'validator-brasil';

export const IsCPF = (options?: ValidationOptions) =>
  ValidateBy({ name: 'isCPF', validator: { validate: (value) => isCPF(value) } }, options);

class Pessoa {
  @IsCPF({ message: 'CPF inválido' })
  cpf!: string;
}
```

### yup

```typescript
import * as yup from 'yup';
import { isCNPJ } from 'validator-brasil';

const schema = yup.object({
  cnpj: yup.string().test('cnpj', 'CNPJ inválido', (value) => !!value && isCNPJ(value)),
});
```

### zod

```typescript
import { z } from 'zod';
import { isCPF } from 'validator-brasil';

const schema = z.object({ cpf: z.string().refine(isCPF, 'CPF inválido') });
```

### joi

```typescript
import Joi from 'joi';
import { isCEP } from 'validator-brasil';

const schema = Joi.string().custom((value, helpers) =>
  isCEP(value) ? value : helpers.error('any.invalid'));
```

### vuelidate

```typescript
import { helpers } from '@vuelidate/validators';
import { isCPF } from 'validator-brasil';

const rules = { cpf: { isCPF: helpers.withMessage('CPF inválido', isCPF) } };
```

## Desenvolvimento

```bash
yarn install
yarn test   # testes + cobertura (mínimo de 80%)
yarn build  # gera dist/
```

O pipeline publica no npm a cada push na `main` em que a versão do `package.json` ainda não foi publicada.

Veja o [CHANGELOG](./CHANGELOG.md) e o [roadmap](./docs/TODO.md).

## Licença

MIT
