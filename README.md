# validator-brasil

Extensão do [validator.js](https://github.com/validatorjs/validator.js) para validação de documentos brasileiros. 🇧🇷

[![Tests and Publish](https://github.com/ogilvieira/validator-brasil/actions/workflows/main.yml/badge.svg)](https://github.com/ogilvieira/validator-brasil/actions/workflows/main.yml)
[![npm-version](https://img.shields.io/npm/v/validator-brasil?color=brightgreen&label=npm%20package)](https://www.npmjs.com/package/validator-brasil)
[![downloads](https://img.shields.io/npm/dt/validator-brasil.svg)](https://www.npmjs.com/package/validator-brasil)


## Instalação
```bash
npm install validator-brasil --save
// or
yarn add validator-brasil
```

## Uso
```typescript
import validatorBrasil from 'validator-brasil';
// import isCPF from 'validator-brasil/isCPF';
// const isCPF = require('validator-brasil/isCPF');

validatorBrasil.isCPF('045.462.356-90') //true
```

## Métodos

|Nome|Descrição|Exemplo|
|----|---------|--------------|
|isCPF(string)|CPF com e sem pontuação|145.525.860-17|
|isCNPJ(string)|CNPJ com e sem pontuação|03.615.211/0001-27|
|isCEP(string)|CEP com e sem pontuação|18703-357|
|isCNH(string)|CNH com e sem pontuação|62312481179|
|isRenavam(string)|Renavam com e sem pontuação|11779918350|
|isUF(string)|UF de estados brasileiros|sp|
|isChavePix(string)|Padrão de chave pix aleatória|123e4567-e89b-12d3-a456-426655440000|
|❌ isPisPasep(string)|PIS/PASEP com e sem pontuação|888.18726.88-5|
|❌ isRG(string)|RG com e sem pontuação|35.181.674-4|
|❌ isTituloEleitor(string, { uf: string })|Titulo de eleitor por estado brasileiro|434028530132|
|❌ isCertidao(string)|Certidões de Nascimento, Casamento, Óbito, entre outras|623584 01 55 2023 9 48814 529 8424277-49|
|❌ isInscricaoEstadual(string, { uf: string })|CPF com e sem pontuação|145.525.860-17|
|❌ isPlacaVeiculo(string)|Placas de automóveis brasileiros e mercosul|JYC-8417|
|❌ isCNS|Cartão Nacional de Saúde|137 2766 6992 0001|
|❌ isNIF|Número de Identificação Fiscal|664551142|

Saiba mais em [TODO.md](./docs/TODO.md)
