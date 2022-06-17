# Pokédex

Projeto web de gerenciamento e exibição de informação sobre Pokémons.
A aplicação possui 4 rotas, cada uma com os seguintes objetivos:

 - Cadastrar
 - Editar
 - Listar
 - Exibir dados
 
## Tecnologias 

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

 - Angular:  12.1.4
 -  Node.js: 14.19.1

## Requisitos

Para executar a aplicação, é necessário instalar o Node.js versão 14.19.1

>[ Node.js]( https://nodejs.org/dist/v14.19.1/)

## Execução da aplicação

Entre  na pasta raíz do projeto e execute o comando de instalação das dependências do projeto
```
npm install
```
Execute o comando a seguir para iniciar a aplicação
```
npm run start
```
O comando acima executa em paralelo o servidor da aplicação e o servidor de API REST ( json-server ). O arquivo db.json localizado na raiz do projeto é usado pelo json-server para armazenar toda fonte de dados da aplicação.

## Testes unitários
Os testes unitários foram feitos utilizando as próprias ferramentas de testes provenientes do Angular, o Jasmine e o test runner Karma. Para executar os testes unitários, é necessário possuir o navegador Chrome instalado. Para rodar os testes, execute
```
npm run test
```

##  Testes end to end
Os testes end to end foram feitos utilizando o framework de testes Cypress.
>[Cypress](https://www.cypress.io/)

**Importante: para realizar os testes end to end, é necessário que a aplicação esteja em execução.** 

Execute o seguinte comando na raíz do projeto
```
npm run cypress:open
```
Na janela de boas vindas do Cypress que abrirá, clique na opção "E2E Testing". Em seguida, escolha a opção "Chrome" e clique no botão "Start E2E Testing in Chrome". Será aberto o navegador. Para iniciar os testes, clique no arquivo listado "spec.cy.ts" 