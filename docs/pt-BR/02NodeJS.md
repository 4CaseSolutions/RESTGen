# NodeJS

O **NodeJS** é um interpretador EcmaScript (JavaScript ou JS como é popularmente conhecido) Server side. Ou seja, permite executar intruções com JS no diretamente no servidor. Sua arquitetura permite que possamos executar instruções em códigos de forma assíncrona (enquanto uma tarefa é executada, outras podem ir sendo executadas/processadas em paralelo). Isso dá um ganho de desempenho gigantesco nas aplicações que rodam em Node. A possibilidade de fazer com que o JavaScript seja executado no backEnd também é um bônus, já que JS é uma linguagem de programação interpretada nos web browsers e que também está presente em alguns bancos de dados **NoSQL**, o que possibilita que um programador seja multidisciplinar utilizando uma **única linguagem de programação** daí temos o termo FullStack.

## Instalação do Node.js

Vamos começar? 

Para começarmos a programar em *Node.js*, vamos precisar instalar o Node no nosso ambiente de desenvolvimento.

- No nosso caso, vamos instalar o node versão 13 no Pop'OS que é uma distro baseada no ubuntu!

```
$ curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -

$ sudo apt-get install -y nodejs
```

- Ou caso prefira, no Ubuntu ou Debian, abra um terminal e siga os passos da documentação oficial.

https://github.com/nodesource/distributions/blob/master/README.md#debian-and-ubuntu-based-distributions


## Hello world em JavaScript com Node.js

Para executar uma instrução em NodeJS você só precisa abrir um terminal e digitar node e então apertar a tecla "Enter". No terminal que irá abrir você pode digitar console.log("hello world") como no exemplo abaixo e então teremos nossa primeira execução de JS no servidor

```
$ node

> console.log("hello world")
```

## Node Package Manager (NPM)

O NPM é um gerenciador de dependências (pacotes desenvolvidos por terceiros presentes no NPM online) ou pacotes presente no NodeJS. Através dele, podemos estruturar nossas aplicações e suas dependencias. Assim, o NPM cria um arquivo de gerenciamento que se encontrará na raiz dos nossos projetos, o **package.json** e sempre que precisarmos fazer mudanças estruturais na nossa aplicação, como instalação em outro server, instalação de novas dependências o NPM irá gerenciar a instalação de tudo automáticamente de acordo com a plataforma que estivermos usando (Win, Linux, MacOS). Programas escritos em Node podem utilizar módulos ou frameworks desenvolvidos por outros desenvolvedores e compartilhados com a comunidade através dos repositórios do NPM online como já dissemos anteriormente, você inclusive pode desenvolver seus pacotes de disponibilizar via NPM.

## Criando nosso primeiro projeto em node com NPM

Para criar um projeto em Node, vamos criar um diretório onde acharmos conveniente em nosso sistema operacional. No meu caso vou utilizar um diretório chamado projetos no minha home e nele, vou criar um diretório chamado RESTGen.

```
$ mkdir RESTGen
```

Uma vez criado o diretório, vamos executar o comando npm init.

```
$ npm init
```

Ele vai fazer uma série de perguntas, você pode simplesmente teclar "Enter" ou digitar algo de acordo com o perguntado e então teclar "Enter".

*Nota: em "entry point:" digite o nome do arquivo inicial do nosso projeto, no nosso caso app.js*

*Em "test command:" digite o comando de teste da nossa aplicação no nosso caso "nodemon src/app.js" sem aspas*

Assim que tudo estiver pronto, vamos inicar a criação da nossa estrutura de diretórios do projeto. O diretório **src** é o diretório que vai conter todos os nosso arquivos de programação do nosso sistema, nele vamos salvar os módulos próprios da nossa API. Então no diretório "src" você vai criar o arquivo principal do nosso projeto, nele vai estar o conjunto de instruções pricipal do nosso sistema por isso, ele vai se chamar app.js pois é aqui que nossa aplicação vai iniciar.

```
$ mkdir src
$ cd src
$ touch app.js
```
Agora, podemos fazer com que nosso arquivo app.js execute um conjunto de instruções para executarmos taréfas, nesse caso vamos fazer novamente o nosso "hello world". Edite o arquivo app.js como abaixo:

```
$ vim app.js
// Isto é um comentário
// Abaixo vamos definir uma constante chamada a
const a = "Hello ";
// Abaixo vamos definir uma constante chamada b
const b = "World";
// Abaixo vamos mandar imprimir no console, o conteúdo das nossas constantes
console.log( a + b );
```

Antes de avançarmos, vamos usar o NPM para instalar o nodemon. O nodemon é um modulo npm que faz com que possamos testar uma aplicação enquanto vamos incluindo funcionalidades nela. Como ele é um módulo legal para testar aplicações, vamos instalar ele globalmente para que possamos usar em outros projetos.

```
$ sudo npm install -g nodemon
```

Agora vamos mandar o Node executar as instruções contidas em app.js. Observe que vamos usar o comando **npm test**. Mas, poderiamos usar também diretamento o **nodemon src/app.js**. No entanto, quando definimos o comando de "test" na inicialização do nosso projeto (npm init) dissemos que o comando seria "nodemon src/app.js" assim, sempre que usarmos **npm test** o node executará para nós automáticamente o comando que digitamos no parametro "scripts.test" descrito no nosso **package.json**.

```
$ npm test
```
Saída:

```
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/app.js`
Hello World
[nodemon] clean exit - waiting for changes before restart
```


[Anterior](./01Introducao.md) <---- | ----> [Avançar](./03AmbienteDEV.md)