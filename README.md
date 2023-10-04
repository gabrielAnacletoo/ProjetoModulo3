# API de Busca de Vagas de Emprego 🚀

## Dependências Utilizadas

Aqui estão as estrelas do show, as dependências que fazem tudo funcionar:

- **bcrypt**: Para deixar as senhas seguras e tranquilas.
- **dotenv**: Para quando você precisa de um ambiente mais discreto.
- **express**: O motor por trás do seu servidor web, dando vida às suas rotas.
- **jsonwebtoken**: Porque às vezes é bom ter um passaporte digital.
- **mongoose**: Conectando você ao MongoDB.
- **mongoose-paginate-v2**: Para fazer aquela paginação com estilo.
- **supertest**: Testando suas API com elegância.
- **tsup**: Dando um trato no TypeScript para o navegador.
- **typescript**: mantendo código seguro.
- **vitest**: Para realizar testes.
- **yup**: Validando os dados de forma descomplicada.

## Rotas da API

### GET /user/me
- **Descrição**: Retorna todas as informações do usuário.
### GET /technology
- **Descrição**: Retorna todas as tecnologias cadastradas no MongoDB.
### GET /jobs/
- **Descrição**: Retorna todas as vagas cadastradas no MongoDB com paginação.
- **Query**: A Query precisa especificar qual pagina ira retornar e a quantidade de registros na página
- **Exemplo**:  /jobs/?page=1&limit=8
- ### GET /search
- **Descrição**: Retorna todas as 5 tecnologias mais procuradas e as 5 cidades que mais pesquisaram por ela.
### GET /jobs/search
- **Descrição**: Retorna todas as vagas buscando por diversos filtros através da query.
- **Query**: A query deve pesquisar por propriedades das vagas como salary, tipo de contrato ou local
- **Exemplo**: /search?jobcontract=clt&localtype=presencial
- ### GET /jobs/all
- **Descrição**: Retorna todas as vagas cadastradas no mongoDB.

### POST /auth
- **Descrição**: Faz o login e retornar um token.
- **Corpo da Requisição**:
- {
-	"email": "fulano@ciclano.com.br",
-	"password": "senha1234"
- }
### POST /technology/register
- **Descrição**: Cria uma tecnologia no bando de dados.
- **Descrição**: Deve ser passado o ID.
- **Corpo da Requisição**:
- {
-	"name": "React Native"
- }
### POST /user/favorites
- **Descrição**: Adiciona uma vaga ao favoritos do usuário.
- **Corpo da Requisição**:
- {
- 	"favorites": "6516d478d6c472b0832a28a9"
- }
### POST /jobs/register
- **Descrição**: Cria uma vaga no bando de dados.
- **Corpo da Requisição**:
-{
-"position" : "senior",
-"salary" : "12800",
-"jobcontract": "pj",
-"localtype": "remoto",
-"city" : "Fortaleza",
-"technology": ["Algular", "Java"],
-"website" : "www.indeed.com.br",
-"company" : "Alpa Tech",
-"companysize": "media",
-"description" : "Desenvolvedor senior com experiencia",
-"link" : "www.indeed.com.br/senior/vaga"

}

### PATH user/edit
- **Descrição**: Atualiza o nome e o password do usuário, Precisa estar válido ja que o id do usuário vem do token.
- **Corpo da Requisição**:
-{
-	"name": "ciclano",
-	"password": "senhanova123"
-}

### DELETE /user/favorites/remove/:id
- **Descrição**: Remove uma vaga específica dos favoritos.
- **Parâmetros**:
  - `id`: Identificador único da vaga.
- **Corpo da Requisição**:
