# RF

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas as transações que ja ocorreram;
- [x] O usuário deve poder visualizar uma transação única

# RN

- [] A transação pode ser do tipo crédito que somará ao valor total, ou débito subtrairá;
- [] Deve ser possível identificarmos o usuário entre as requisições;
- [] O usuário só pode visualizar transações o qual ele criou;

# Run Application
- npm install
- create .env and .env.test
- npm run knex -- migrate:latest
- npm run test

# How to create build
- npm i tsup -D
-