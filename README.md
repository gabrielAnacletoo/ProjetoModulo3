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

### GET /vagas
- **Descrição**: Retorna todas as vagas disponíveis.
- **Parâmetros**:
  - `salario`: Valor desejado para o salário.
  - `tecnologia`: Tecnologia específica desejada.
  - `local`: Localização da vaga.
  - `contrato`: Tipo de contrato desejado.
  - `remoto`: Se a vaga é remota ou não.

### POST /vagas
- **Descrição**: Cria uma nova vaga.
- **Corpo da Requisição**:
  - `titulo`: Título da vaga.
  - `descricao`: Descrição detalhada da vaga.
  - ... (outras propriedades necessárias)

### GET /vagas/:id
- **Descrição**: Retorna os detalhes de uma vaga específica.
- **Parâmetros**:
  - `id`: Identificador único da vaga.

### PUT /vagas/:id
- **Descrição**: Atualiza os detalhes de uma vaga existente.
- **Parâmetros**:
  - `id`: Identificador único da vaga.
- **Corpo da Requisição**:
  - ... (propriedades a serem atualizadas)

### DELETE /vagas/:id
- **Descrição**: Remove uma vaga específica.
- **Parâmetros**:
  - `id`: Identificador único da vaga.
