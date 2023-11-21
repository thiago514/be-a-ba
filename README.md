# be-a-ba

## 🚀 Como executar o projeto

### API Node

Primeiramente é necessario configurar o banco de dados.
Essa alteração deve ser feita no arquivo *src/configs/db.ts*

A partir dessa etapa é necessario estar dento da pasta *express-ts*

Abrir com o terminal na pasta express-ts e executar o comando

`npm install`

Após instalar as dependencias é necessario compilar os arquivos TypeScript

`npx tsc`

Agora é só executar a API

`npm start`


### API Python

A partir dessa etapa é necessario estar dento da pasta *python-fast-api*

Criando uma venv

`python3 -m venv venv`

Executando a venv(linux)

`source venv/bin/activate`

Executando a venv(windows)

`source venv/Scripts/activate`

Atualizando pip

`pip install --upgrade pip`

Instalando as dependencias

`pip install -r requirements.txt`

É necessario installar um dependencia complementar

`pip install psycopg2`

Caso essa instalação complementar apresente algum erro tente executar o seguinte comando

`pip install psycopg2-binary`

`pip install pandas`

Antes de executar o projeto é necessario alterar a conexão com o Banco de dados *models/models.py*
**Esse banco deve ser o mesmo da API node**

Executando o projeto

`uvicorn main:app`


### Front-end(React)

Primeiramente é necessario estar dento da pasta *Business Tech QQTech*

Instalar os Pacotes

`npm install`

Executar o projeto

`npm run dev`

### Criação do primeiro usuario

Para o primeiro acesso vai ser necessario acessar a URL da API: http://localhost:3000/
matricula: 1234
senha: 1234

Agora é só acessar o sistema

http://localhost:5173