# MongoDB

Quando estamos desenvolvendo um sistema para gerenciamento de informações, sem dúvida alguma a taréfa mais importante é o armazenamento de dados. Por isso, precisamos de uma plataforma de banco de dados.
O **MongoDB** é uma plataforma de banco de dados NoSQL (não utiliza SQL como linguagem de manipulação de informaçõe), e tem em sua arquitetura a utilização de JavaScript como linguagem de programação. Além, das funções nativas da plataforma como o find, update, aggregate, etc. Não vamos entrar em detalhes sobre o MongoDB aqui pois já temos um material focado nele nesse (LINK)[https://www.youtube.com/playlist?list=PLS7aa9znX6rZBYNOQe6bcNvqFo_R2O4fl].

Nossa escolha do MongoDB como plataforma de banco de dados, é devida a flexibilidade proposta pela plataforma no armazenamento de dados, ter JavaScript como linguagem e principalmente por ser uma plataforma de facil gerenciamento para quem vai utilizar o RESTGen como ferramenta para desenvolvimento de MVP ou validação, mas o MongoDB também pode receber uma massa muito grande de dados e alimentar grandes sistemas comerciais.

## Mongoose

O **Mongoose** é um ORM (gerenciador de relações de objetos, básicamente uma interface entre banco de dados e API), ele conta com todas as funcionalidades necessárias para gerenciamento de dados do MongoDB para NodeJS. Além de possuir funcionalidades prontas para gerarmos Schemas (modelos) de nossas coleções (tabelas) do banco de dados, justamente por isso, vamos utilizar-lo em nesse projeto.

A instalação do mongoose no projeto é simples. No shell de usuário, vamos instalar através do "npm" como no exemplo abaixo.

```
RESTGen(master)$ npm i -S mongoose
```

Uma vez instalado, vamos incluir o mongoose no nosso projeto.

```
const app = require("fastify")({
  logger: true
});

// INCLUINDO O MONGOOSE
const db = require("mongoose");
// ----------------------------

app.listen( 3000, "127.0.0.1")
.then( addr => console.log(`API runing in: ${addr}`))
.catch( err => console.error(`Houston, we have a problem | ${err}`));
```

Com o mongoose já presente no nosso projeto, vamos fazer a conexão com o banco de dados.

```
const app = require("fastify")({
  logger: true
});
const db = require("mongoose");

// CONECTANDO AO BANCO DE DADOS
db.connect(`mongodb://127.0.0.1:27017/RESTGen`);
//--------------------------------------------

app.listen( 3000, "127.0.0.1")
.then( addr => console.log(`API runing in: ${addr}`))
.catch( err => console.error(`Houston, we have a problem | ${err}`));
```

Ao executar o comando "npm test" para testar nossa aplicação, perceba que vamos ter um log de "DeprecationWarning" que irá nos informar que precisamos usar duas opções de configuração na função de conexão com o MongoDB.
> { useNewUrlParser: true, useUnifiedTopology: true }

Vamos passar esses parametros de configuração e testar nossa conexão novamente.

```
const app = require("fastify")({
  logger: true
});
const db = require("mongoose");

// CORRIGINDO O DeprecationWarning
db.connect(
  `mongodb://127.0.0.1:27017/RESTGen`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//---------------------------------

app.listen( 3000, "127.0.0.1")
.then( addr => console.log(`API runing in: ${addr}`))
.catch( err => console.error(`Houston, we have a problem | ${err}`));
```


[Anterior](./05Fastify.md) <---- | ----> [Avançar]()