# Projeto de Automção de Testes de API

## Descrição

Este projeto automatiza testes da API pública https://serverest.dev/, que simula operações de um e-commerce.

Inclui testes automatizados de:

* Autenticação
* Usuários
* Produtos

---

## Tecnologias e ferramentas

* Framework PactumJS para automação de testes de API
* Joi.dev para validação de contratos (schemas)
* Chai para asserções
* Mochawesome para geração de relatórios HTML
* Estrutura de teste Triple A (Arrange, Act, Assert)
* Organização em services e schemas, seguindo boas práticas

---

## Pré-requisitos

* Node.js instalado
* Git

---

## Como executar

1. Clone o repositório:

   git clone https://github.com/seuusuario/seuprojeto-api.git
   cd seuprojeto-api

2. Instale as dependências:

   npm install

3. Execute os testes:

   npx mocha tests/**/*.test.js

4. Gere o relatório Mochawesome (gerado automaticamente na pasta mochawesome-report):

   * Após a execução, abra o arquivo mochawesome-report/mochawesome.html no navegador.

---

## Estrutura do projeto

```
/src
  /services     -> Camada que abstrai as chamadas HTTP
  /schemas      -> Schemas Joi para validação do contrato da API
  /helpers      -> Funções auxiliares (Ex: geração de dados aleatórios, configuração)

/tests
  /users        -> Testes da API de usuários
  /products     -> Testes da API de produtos
  auth.test.js  -> Teste do endpoint de login

/config
  config.js     -> Configurações da API (baseUrl, credenciais etc.)
```

---