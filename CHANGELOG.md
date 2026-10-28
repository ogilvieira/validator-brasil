# Changelog

## 2.1.1

### Correções
- `isTituloEleitor` aceita títulos de 13 dígitos de todas as UFs, não só de SP e MG.

### Infra
- Publicação só via trusted publishing (OIDC): o job de publish não usa mais o `NPM_TOKEN` nem gera `.npmrc`.

## 2.1.0

### Novidades
- Build ESM ao lado do CommonJS, com `exports` no `package.json`. Os imports `validator-brasil/isCPF` e `validator-brasil/dist/isCPF` funcionam nos dois formatos.
- `isRG(value, { uf })` aceita RG de qualquer UF. Em SP valida o dígito verificador; nas demais, o formato. Com `uf`, também aceita a CIN (número = CPF).
- `isTituloEleitor` aceita títulos de 13 dígitos de SP e MG.
- `isRenavam` aceita o Renavam antigo de 9 dígitos.
- Novo método `isNIF` (CPF ou CNPJ).

### Infra
- Publicação no npm via trusted publishing (OIDC). O `NODE_AUTH_TOKEN` agora fica no nível do job, o que corrige a falha do yarn no `setup-node`.

## 2.0.0

### Quebra de compatibilidade
- `isChavePix` agora aceita todos os tipos de chave (CPF, CNPJ, e-mail, telefone e aleatória). Antes aceitava só a aleatória (UUID). Para manter o comportamento antigo, use `isChavePix(value, { type: 'aleatoria' })`.
- `isChavePix` passou a exigir que a chave aleatória ocupe a string inteira (antes `'x' + uuid` era aceito) e aceita UUID em maiúsculas.
- Node.js 20 ou superior.

### Novidades
- `isCNPJ` aceita o CNPJ alfanumérico (IN RFB nº 2.229/2024).
- Novos métodos: `isRG` (padrão SP), `isTituloEleitor`, `isCertidao`, `isInscricaoEstadual`, `isPlacaVeiculo` e `isCNS`.
- Export padrão: `import validatorBrasil from 'validator-brasil'`, como o README já mostrava.

### Correções
- `isPisPasep` documentado na 1.0.0, mas ausente do pacote publicado: o `dist/` versionado estava desatualizado. Agora o build roda antes de cada publicação (`prepublishOnly`) e `dist/` saiu do git.
- `package.json` passa a declarar `types` e `files`.

### Infra
- Testes com cobertura mínima de 80% (`coverageThreshold`).
- CI testa em Node 20, 22 e 24. A publicação só roda em push na `main` e só quando a versão ainda não existe no npm.
- Dependências de desenvolvimento atualizadas: Jest 30, ts-jest 29.4, TypeScript 7 (build) e lockfile regenerado, eliminando as vulnerabilidades transitivas críticas e altas.
- O build usa o TypeScript 7 (`tsc`). Como o ts-jest ainda depende da API JavaScript do compilador, os testes usam o pacote de compatibilidade `@typescript/typescript6`, instalado com o nome `typescript`.
