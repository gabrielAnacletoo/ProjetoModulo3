# 🚀 API de Busca de Vagas de Emprego 
 ### Bem vindo(a)!
 ```bash
 Descubra empregos dos sonhos! Nossa API permite busca avançada por salário, cidade, contrato, tecnologia e mais. 
 Cadastre-se, faça login seguro   com JWT, favorite vagas, e aproveite a paginação fácil.
```
## 💻 Instalação

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.
```bash
# Clone esse repositório
- $ git clone https://github.com/gabrielAnacletoo/ProjetoModulo3

# Vá para o repositório Back-end
- $ cd Projeto modulo 3

# Instale as dependencias
- $ npm i typescript tsx dotenv bcrypt jsonwebtoken mongoose-paginate-v2 tsup vitest yup mongoose express -D
- $ npx tsc --init 
- $ npm run build 

# Rode a aplicação
- $ npm run start:dev
```
## 👨‍💻 Entidades utilizadas no projeto
```bash
- # Auth
- $ cuida da autenticação da api.
- # CitySearch
- $ Registra as pesquisas feitas em determinada cidade e tecnologia.
- # Jobs
- $ É a entidade responsavel por criar as vagas.
- # Technology
- $ Tecnology é a entidade usada para criar as tecnologias.
- #  User
- $ E por último a entidade de user que é responsavel pelo usuário.
```

## 👨‍💻 Dependências Utilizadas
📚 Aqui estão as estrelas do show, as dependências que fazem tudo funcionar:

- [bcrypt](https://www.npmjs.com/package/bcrypt): 5.1.1
- [dotenv](https://www.npmjs.com/package/dotenv): 16.3.1
- [express](https://expressjs.com/pt-br/): 4.18.2
- [jsonwebtoken](https://jwt.io/): 9.0.2
- [mongoose](https://mongoosejs.com/): 7.5.2
- [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2): 1.7.4
- [tsup](https://www.npmjs.com/package/tsup): 7.2.0
- [typescript](https://www.typescriptlang.org/): 5.2.2
- [vitest](https://vitest.dev/): 0.34.5
- [yup](https://www.npmjs.com/package/yup): 1.2.0


## 🛣️ Rotas da API

### 🔵 GET /user/me
- **Descrição**: Retorna todas as informações do usuário.
### 🔵 GET /technology
- **Descrição**: Retorna todas as tecnologias cadastradas no MongoDB.
### 🔵 GET /jobs/
- **Descrição**: Retorna todas as vagas cadastradas no MongoDB com paginação.
- **Query**: A Query precisa especificar qual pagina ira retornar e a quantidade de registros na página
- **Exemplo**:  /jobs/?page=1&limit=8
### 🔵 GET /search
- **Descrição**: Retorna todas as 5 tecnologias mais procuradas e as 5 cidades que mais pesquisaram por ela.
### 🔵 GET /jobs/search
- **Descrição**: Retorna todas as vagas buscando por diversos filtros através da query.
- **Query**: A query deve pesquisar por propriedades das vagas como salary, tipo de contrato ou local
- **Exemplo**: /search?jobcontract=clt&localtype=presencial
### 🔵 GET /jobs/all
- **Descrição**: Retorna todas as vagas cadastradas no mongoDB.

### 🟢 POST /auth
- **Descrição**: Faz o login e retornar um token.
- **Corpo da Requisição**:
```javascript
{
email: "fulano@ciclano.com.br",
password: "senha1234"
}
```
### 🟢 POST /technology/register
- **Descrição**: Cria uma tecnologia no bando de dados.
- **Descrição**: Deve ser passado o ID.
- **Corpo da Requisição**:
```javascript
{
name: "React Native"
}
```
### 🟢 POST /user/favorites
- **Descrição**: Adiciona uma vaga ao favoritos do usuário.
- **Corpo da Requisição**:
```javascript
{
favorites: "6516d478d6c472b0832a28a9"
}
```
### 🟢 POST /jobs/register
- **Descrição**: Cria uma vaga no bando de dados.
- **Corpo da Requisição**:
```javascript
{
position: "senior",
salary: "12800",
jobcontract: "pj",
localtype: "remoto",
city: "Fortaleza",
technology: ["Algular", "Java"],
website: "www.indeed.com.br",
company: "Alpa Tech",
companysize: "media",
description : "Desenvolvedor senior com experiencia",
link : "www.indeed.com.br/senior/vaga"
}
```

### 🟡 PATH user/edit
- **Descrição**: Atualiza o nome e o password do usuário, Precisa estar válido ja que o id do usuário vem do token.
- **Corpo da Requisição**:
 ```javascript
{
name: "ciclano",
password: "senhanova123"
}
```
### 🔴 DELETE /user/favorites/remove/:id
- **Descrição**: Remove uma vaga específica dos favoritos.
- **Parâmetros**:
- `id`: Identificador único da vaga.

### Detalhes Adicionais
- **Autor da Vaga:** [Gabriel Anacleto](https://www.linkedin.com/in/gabriel-anacletoo/)
- **Contato:** gabrielanacleto159@live.com
