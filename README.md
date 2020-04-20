# v.caixa

Teste para a vaga de Desenvolvedor na Tecnospeed

# Instalçãoes

Banco de dados PostgreSQL, crie um bancoo de dados:

> CREATE DATABASE vcaixa;

> CREATE DATABASE vcaixa_test;

Instale o nvm

Instale a versão do node v12.13.1

Instale a última versão do yarn

Instalar o knex e pg globalmente

> npm install knex -g

> npm install pg -g

Na pasta do projeto execute

> npm install

# Migrações

Para criar as tabelas dos dois banco de dados

> yarn migrate-all

# Testes automatizados

Para executar todos os testes

> yarn test

Para executar todos os testes e gerar relatório de cobertura de testes

> yarn test:cover
