# Account-bank Project

Crição de conta bancária!

Frameworks, pacotes e linguagens utilizadas:

- [Typescript](https://www.typescriptlang.org/) - Linguagem de programação utilizada, JavaScript com tipagem estática opcional à linguagem.
- [NodeJs](https://nodejs.org/en/) - Software/Interpretador utilizado para rodar código TypesScript/JavaScript fora da Web.
- [Docker](https://docs.docker.com/compose/) - Utilizado para **[Dockerizar](https://medium.com/trainingcenter/dockerizando-sua-aplica%C3%A7%C3%A3o-e18969613f4b)** minha aplicação, onde subi minha api e meu banco de dados!
- [Typeorm](https://medium.com/trainingcenter/dockerizando-sua-aplica%C3%A7%C3%A3o-e18969613f4b) - Utilizado para gestão e controle do meu database!
- [PostgreSql](https://www.postgresql.org/) - Sistema do meu banco de dados.
- [Reflect Metadata](https://www.npmjs.com/package/reflect-metadata) - Quando habilitado, contanto que a biblioteca reflet-metadata tenha sido importada, informações adicionais de tipo de tempo de design serão expostas no tempo de execução. Precisa deixar `emitDecoretorMetaData` e `experimentalDecorator` ativos no tsconfig.json.
- [Jwt](https://github.com/auth0/node-jsonwebtoken) - Vai criar um token que expira para controlar login e acesso às rotas.
- [Cors](https://expressjs.com/en/resources/middleware/cors.html) - Controle de acesso da minha api, nesse caso, permiti acesso geral.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Bcrypt é um método de criptografia do tipo hash, utilizo para criptografar alguns dados antes de jogar no bd!
- [morgan](https://www.npmjs.com/package/morgan) - Gera logs detalhados.
- [express](https://expressjs.com/pt-br/4x/api.html) - Utizado para rodar nosso servidor.
- [Joi](https://www.npmjs.com/package/@hapi/joi) - Validar parâmetros recebidos pelo body.
- [dotenv](https://www.npmjs.com/package/dotenv) - Utilizado para armazenar variáveis de ambiente no projeto
- [es2021](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) - Dentro do _tsconfig.json_, em `target` e `lib: []`, estou utilizado o ES2021!

# 🚀 Começando

Consulte **[Instalação](#-instala%C3%A7%C3%A3o)** para saber como implantar o projeto.

## 📋 Pré-requisitos

De que coisas você precisa para rodar o server?

- _Docker Compose instalado na wsl ou através de docker-desktop._

- Ah! Estou utilizando a versão 18.12 do node! Sendo assim, recomendo utilizar a mesma para evitar bugs.

## Mudando Versão do Node (se necessário)

- Para isso, recomendo a utilização do NVM!

### Instalação Linux / WSL ->

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

Retornando a versão

```
nvm -v
```

```
nvm install 18.12.1
```

Com isso, ele deve já estar utilizando a versão 18.12 do node!

```
node -v
```

### **[Instalação NVM Windows](https://github.com/coreybutler/nvm-windows)**

# 🔧 Instalação

1. Run `npm i` command
2. Crie um arquivo _.env_ no diretório inicial do projeto com o seguinte modelo:

```
DB_USER='postgres'
DB_HOST='db'
DB_NAME='account-bank'
DB_PASSWORD='password'
DB_PORT=5432
PORT=4000
SECRET_KEY='Sua Secret Key'
```

- Os arquivos ormconfig.json e data-source.ts (responsáveis pela configuração do banco de dados)
  Já estão com essas informações mencionadas acima, então, se preferir pode utilizar os mesmos dados para facilitar!

3. Certifique-se de que o serviço do docker esteja rodando! Para isso, abra o docker desktop caso esteja utilizando windows com wsl ou rode o comando service docker start.
4. Rode o comando que eu criei `make up`, esse comando vai realizar um docker compose up -d, já liberando o terminal para uso!
5. Pronto! Agora certifique-se de que os containers estão rodando com um `docker container ls -a`!

# 🔧 Utilização

- Importe no seu postman as collection que eu deixei no repositório junto das variáveis globais do postman! Ambos estão prontos para uso.

### 📚 Pastas (Server)

```
├── src - App, server e data-source
│   ├── @types - Aprimorando alguma interface já existente
│   ├── common - Funções globais, comuns.
│   ├── Domain
│        ├── account - Controller, service, schema e entity que envolve account.
│        ├── auth - Controller, service, schema e entity que envolve auth.
│        ├── transaction - Controller, service, schema e entity que envolve transaction
│        ├── user - Controller, service, schema e entity que envolve user.
│   ├── middleware - Todos os middleware do projeto.
│   ├── repository - crição de repository, conexão com as tabelas.
│   ├── routes - rotas do projeto

```

# 🗝️ Secret Key

- A secret key é uma .env que eu criei, que basicamente armazena um código. Esse código é utilizado para criar a JWT! Basicamente é enviada como parametro junto de outros dados que são armazenados dentro do token gerado. É importante ter uma _Secret Key_ para segurança do projeto. Utilizada para incrementar ainda mais o token e utilizar como validação. Dito isso, recomendo gerar sua Secret Key no seguinte site: https://randomkeygen.com/

1. Abra o site https://randomkeygen.com/
2. Desça a tela até as keys _CodeIgniter Encryption Keys_
3. Escolha uma, copie e salve dentro de `SECRET_KEY` no seu _.env_

# Explicando Docker Compose Yml e Docker File

## Docker File

- O Docker file é responsável pela criação de uma imagem no docker. No caso desse projeto, precisei utilizar o docker file para criar uma imagem da minha **API**!
- Dito isso, dentro dele coloquei as instruções que eu quero para a minha imagem! É o jeito mais fácil para automatizar a criação de imagens.

Segue uma explicação do arquivo:

Instala a imagem Node.js na minha imagem!

```
FROM node:18.12.1-alpine3.16
```

Define o diretório de trabalho para qualquer comando RUN, CMD, COPY
Os arquivos que colocamos no contêiner do Docker executando o servidor estarão em:

```
WORKDIR /usr/src/server
```

Copia package.json, package-lock.json, tsconfig.json, .env para a raiz de WORKDIR

```
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
```

Copia tudo do diretório src para WORKDIR/src

```
COPY ./src ./src
```

Instala todos os pacotes no container

```
RUN npm install
```

Vai rodar o comando npm start, assim que nosso container criar a api já vai passar a rodar, sem necessitar de um npm start!

```
CMD npm run start
```

### Arquivo total:

```
FROM node:18.12.1-alpine3.16
WORKDIR /usr/src/server
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
COPY ./src ./src
RUN npm install
CMD npm run start
```

## Docker Compose Yml

- O docker-compose.yml ´´e o arquivo que define serviços, rede e volumes para uma Docker Application.
- De outra forma, é lá que configuramos os nosso containers, as imagens que vão rodar nele, as portas, seus nomes, os volumes onde vão salvar suas informações para não perder! Entre outros exemplos.

- Nesse meu exemplo, estou utilizando a versão 3.8 do docker-compose, e estou subindo 2 containers, ou melhor, 2 serviços.
- Um deles é a api que eu criei, que depende da criação do serviço **db**, onde o postgres está! Como estou criando os 2 containers juntos, eles já são criados na mesma rede em modo bridge, e por conta disso, minha api acessa localmente o PostgreSql através do host: "postgres" (nome do container do postgress).

Caso queira entender como está a rede, rode o comando:

```
docker network ls
```

Depois anote o networkid da rede que está em primeiro, ela é a rede criada pelo docker para armazenar os dois containers criados!

```
docker network inspect networkId
```

Dentro, vai ter os dois containers com ipv4 subsequente!

- Dentro do arquivo tem variáveis que retornam do .env, sim! O docker-compose-yml entende o .env do seu projeto! Por isso eu sugeri que o .env fosse criado, é necessário as variáveis que estão nele dentro daquele formato que eu passei para criar um container!
