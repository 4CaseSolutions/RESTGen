# Mongoose padronizando o gerenciamento de dados no MongoDB

Quando estamos desenvolvendo um sistema para gerenciamento de informações, sem dúvida alguma, a taréfa mais importante é o armazenamento de dados. Por isso, precisamos de uma plataforma de banco de dados.

O **MongoDB**, é uma plataforma de banco de dados NoSQL (não utiliza SQL como linguagem de manipulação de informações), e tem em sua arquitetura a utilização de JavaScript como linguagem de programação. Além, das funções nativas da plataforma como o find, update, aggregate, etc. Não vamos entrar em detalhes sobre o MongoDB aqui pois já temos um material focado nele nesse [LINK](https://www.youtube.com/playlist?list=PLS7aa9znX6rZBYNOQe6bcNvqFo_R2O4fl).

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

## Schemas

Schemas são representação das nossas coleções no MongoDB. O uso de schemas nos ajuda a garantir a padronização das informações das nossas coleções, já que no MongoDB em uma coleção podemos salvar documentos da forma como acharmos melhor. Como não queremos que em uma coleção de "Objetos" sejam salvas informações de "Pessoas", antes de manipular informações na coleção de objetos, vamos criar uma "representação" de um objeto na nossa API utilizando a função Schema do mongoose, para informar os atributos de um objeto, bem como os tipos de dados que cada atributo terá.

No nosso Schema de objeto por exemplo, ficará como abaixo.

```
const objSchema = new db.Schema(
  {
    name: String,
    createdAt: { type: Date, default: new Date() }
  },
  {
    collection: "objects",
    versionKey: false
  }
);
```

Observe que no modelo de Schema acima, a função Schema do mongoose recebeu dois objetos (parametros). O primeiro deles, é a representação do documento (objeto) no banco de dados, quais informações e tipos de dados que serão salvos nessa coleção. Observe ainda, que na primeira informação "name" colocamos o tipo de dados (String) direto como valor do atributo name, já no segundo "createdAt" (data de criação) passamos um objeto informando o tipo de dados e um dados default que será inserido caso nada seja informado. Essa facilidade é importante para que possamos gerar o autopreenchimento ou auto padronização de campos que não queiramos que sejam tão flexiveis assim. O segundo objeto do nosso Schema, é o objeto de configuração desse schema para o mongoose. Através dele, o mongoose receberá informações sobre como esse schema deverá se "encaixar" no banco de dados. Assim, o atributo "collection" informa que esse schema é responsável pela manipulação da coleção "objects" e o atributo "versionKey" informa que o mongoose não deve gerar um indicador de versão desse objeto no banco de dados. O que quando não é configurado, é salvo automáticamente através do atributo "__v" em cada um dos objetos salvos na coleção usando o mongoose.


## Models

Por fim, os modelos do mongoose, são a função que representa a conexão entre a nossa API e a coleção no banco de dados através do mongoose.
A função "model()" gera a interface entre o mongoose e o mongodb para nossa API. Ela terá dois atributos. O primeiro é o nome desse modelo, visto que o model é uma instância da iterface (conexão) entre a API e o banco de dados. O segundo é o Schema que criamos anteriormente.

Nosso modelo ficará como abaixo.
```
db.model(
  "Object",
  objSchema
);
```

## Teste de conexão

Para testar nossa coneção com o banco de dados, vamos fazer com que a rota GET de objetos criada anteriormente, busque nossos objetos no banco de dados. Mas antes, vamos salvar esses objetos no banco de dados do mongodb.

Abra um terminal e acesse o banco de dados:
> mongo RESTGen

Então, crie dois objetos na coleção de objetos:
> db.objects.insertMany([{ name: "Hello"},{ name: "World"}])

Agora voltando ao nosso código, vamos fazer com que a nossa rota "GET /objects" busque esses objetos no banco de dados. Lembre-se que a "const objModel" é uma instancia da coleção objects do mongodb na nossa API, por isso ela conta com todas as funções de coleções do mongodb como: find, findOne, aggregate, etc.


```
const app = require("fastify")({
  logger: true
});
const db = require("mongoose");
db.connect(
  `mongodb://127.0.0.1:27017/RESTGen`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const objSchema = new db.Schema(
  {
    name: String,
    createdAt: { type: Date, default: new Date() }
  },
  {
    collection: "objects",
    versionKey: false
  }
);

const objModel = db.model(
  "Object",
  objSchema
);

app.get("/objects", async (req, res) => {
  return await objModel.find({});
});

app.listen( 3000, "127.0.0.1")
.then( addr => console.log(`API runing in: ${addr}`))
.catch( err => console.error(`Houston, we have a problem | ${err}`));

```

Ao executar a requisição no nosso navegador, agora os dados serão buscados no banco de dados e então retornados para nosso cliente (navegador).

Request:
> localhost:3000/objects

Response:
> [{ "_id":"5eece448e0ee440dee01335d", "name":"Hello", "createdAt":"2020-06-19T16:12:17.860Z"},{ "_id":"5eece448e0ee440dee01335e", "name":"World", "createdAt":"2020-06-19T16:12:17.860Z" }]

Agora nossos dados já estão sendo buscados no banco de dados. :)

[Anterior](./05Fastify.md) <---- | ----> [Avançar]()