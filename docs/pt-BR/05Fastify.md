# NodeJS

O **Fastify**, é um framework de desenvolvimento de Web API com foco em desempenho e baixo custo de processamento. Por isso, ele é uma ferramenta que vem se destacando e ganhando inclusive público do **Express** na criação de API REST para micro serviços.

A vantagem de se utilizar o "Fastify", é que ele abastrai a necessidade de desenvolvimento de toda uma estrutura de codigo para gerar uma interface HTTP para nossas API's. Frente à outros frameworks, ele já conta com uma estrutura de configuração onde podemos passar como parametros a exibição de logs de transação, a padronização das respostas às transações das quais fez parte, a exibição em árvore da estrutura de rotas já disponibilizadas através dele. Além de contar com todo o roteamento necessário para nossa API como GET, POST, UPDATE, DELETE, outros.

## Instalação

A instalação pode ser feita através do "npm" assim como quaisquer outros módulos presentes na estrutura nodejs.

```
npm i -S fastify
```

Assim que instalar o fastify, vamos informar ao git do projeto para ignorar o diretório node_modules e o package-lock.json

```
$ vim .gitignore


```

## Criando nossa primeira API

Para criar uma API simples nele é de fato muito "simples". Você pode instanciar uma execução dele em uma constante, como no caso abaixo "app" e passar como parametro de execução do fastify alguns parametros de configuração, nesse caso, habilitaremos os logs para podermos observar as transações feitas com nossa API em desenvolvimento.

```
const app = require("fastify")({
  logger: true
});

app.listen( 3000, "127.0.0.1")
.then( addr => console.log(`API runing in: ${addr}`))
.catch( err => console.error(`Houston, we have a problem | ${err}`));

```

No exemplo acima, após executar a instancia do fastify e instanciar na constante APP, vamos fazer com que ela escute por requisições HTTP na porta 3000 e aceite requisições somente na interface de loopback (127.0.0.1). Assim, nossa aplicação em desenvolvimento só irá receber requisições a partir da própria máquina onde estiver sendo executada. Para escutar nas demais interfaces, podemos mudar o IP de escuta para 0.0.0.0 que significa que podemos receber requisições de todas as interfaces ou do ip de rede lan da máquina (192.168.0.10) que irá habilitar nossa API a escutar requisições a partir da rede LAN.

Observe que após executar a função listen que habilita a escuta da nossa API. Nós executamos uma função de callback como parametro do then, que dirá que se tudo estiver funcionando, então exibiremos em um console.log a mensagem de que a API está rodando no endereço do host. Ou, no caso de um erro, uma função será executada para exibir o erro através do catch.

## Teste

Para testar nossa API, vamos rodar no terminal no diretório da nossa API o comando "npm test".
```
RESTGen(master)$ npm test

{"level":30,"time":1592434814665,"pid":8221,"hostname":"notentdell","msg":"Server listening at http://127.0.0.1:3000","v":1}
API runing in: http://127.0.0.1:3000
```
Observe que ao iniciar o teste de nossa API, automáticamente um objeto contendo algumas informações foi exibido para nós seguido da mensagem que mandamos executar no console.log exibindo o conteudo da variavel addr que passamos como parametro da função de callback no "then" de sucesso.

Esse objeto de log será exibido justamente pois passamos como parametro do objeto de configuração a opção "logger: true", e além dele, para cada requisição que nossa API receber, um log dessa transação será exibido.

Abra o navegador de sua preferencia e acesse sua API a partir dele. Com a URL de acordo com o que foi programado: 

*http://127.0.0.1:3000*

Observe que ao dar um "Enter", mesmo que nós não tenhamos definido uma rota inicial para nossa API, já vamos por padrão ter uma resposta de erro no cliente (browser). Essa mensagem contará inclusive com statusCode da transação, mesmo que nós não tenhamos definido nem uma tratativa de erro.

*{"message":"Route GET:/ not found","error":"Not Found","statusCode":404}*



[Anterior](./04NodeJS.md) <---- | ----> [Avançar]()