# Cadastro de Empresas - Front-end Angular

Este é um front-end responsivo desenvolvido em Angular, utilizando Tailwind CSS para estilização, com foco no cadastro e gerenciamento de empresas. O projeto consome uma API para manipulação de dados e pode ser facilmente configurado e executado localmente.

## Tecnologias utilizadas

- **Angular**: Framework utilizado para construção da interface do usuário.
- **Tailwind CSS**: Framework para estilização e design responsivo.
- **TypeScript**: Para tipagem estática e melhor manutenção do código.
- **Node.js/NPM**: Para gerenciamento de pacotes e dependências.
- **API REST**: Integração para manipulação de dados de empresas.

## Requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (versão 18 ou superior)
- NPM (gerenciador de pacotes, geralmente incluído com o Node.js)
- Angular CLI (versão 15 ou superior)

Para instalar o Angular CLI:
```bash
npm install -g @angular/cli
```

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/andreecirillo/empresas-frontend.git
cd empresas-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a URL da API

No arquivo `src/environments/environment.ts`, configure a URL base da API que será consumida.

### 4. Execute o servidor de desenvolvimento

```bash
ng serve
```

### 5. Build para produção

```bash
ng build --prod
```
