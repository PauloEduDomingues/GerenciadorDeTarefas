# Como Rodar o Projeto

Para rodar o projeto localmente, siga os passos abaixo. Certifique-se de que você está na pasta raiz do projeto no terminal antes de começar.

## Passos para o Backend

1. **Navegue para a pasta do backend**:

    ```bash
    cd backend
    ```

2. **Instale as dependências do backend**:

    ```bash
    npm install
    ```

3. **Inicie os serviços do backend com Docker Compose**:

    ```bash
    docker compose up -d
    ```

4. **Inicie o servidor de desenvolvimento do backend**:

    ```bash
    npm run dev
    ```

## Passos para o Frontend

1. **Abra um novo terminal e navegue de volta para a pasta raiz do projeto**:

    ```bash
    cd ..
    ```

2. **Navegue para a pasta do frontend**:

    ```bash
    cd frontend
    ```

3. **Instale as dependências do frontend**:

    ```bash
    npm install
    ```

4. **Inicie o servidor de desenvolvimento do frontend**:

    ```bash
    npm run dev
    ```

Agora, seu projeto deve estar rodando localmente! Você pode acessar o frontend no seu navegador e o backend estará disponível para comunicação com o frontend. 

# Detalhes do Backend

O backend do projeto é desenvolvido em TypeScript utilizando o TypeORM para a criação dos modelos e gerenciamento do banco de dados. Além disso, há um sistema de autenticação JWT implementado no middleware, que valida o acesso às requisições através de tokens.

O servidor roda na porta **3333**.

## Autenticação

Para acessar a maioria das rotas da API, o usuário precisa estar autenticado. A autenticação é feita por meio de **JSON Web Tokens (JWT)**, gerados durante o login e enviados em cada requisição subsequente através do header `Authorization`.

---

## Endpoints da API

### 1. Registro de Usuário

**URL**: `POST http://localhost:3333/api/register`

Essa rota permite o registro de novos usuários. 

- **Request Body**:

    ```json
    {
        "name": "string",
        "email": "string",
        "password": "string"
    }
    ```

- **Response Body**:

    ```json
    {
        "id": "number",
        "name": "string",
        "email": "string"
    }
    ```

---

### 2. Autenticação

**URL**: `POST http://localhost:3333/api/auth`

Essa rota autentica um usuário existente e retorna o token JWT para ser utilizado nas próximas requisições.

- **Request Body**:

    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```

- **Response Body**:

    ```json
    {
        "auth": "boolean",
        "token": "string",
        "user": {
            "id": "number",
            "name": "string",
            "email": "string"
        }
    }
    ```

---

### 3. Criação de Tarefas (Autenticado)

**URL**: `POST http://localhost:3333/api/users/:userId/tasks`

Essa rota cria uma nova tarefa para o usuário autenticado.

- **Headers**:
    - `Authorization: Bearer {token}`

- **Request Body**:

    ```json
    {
        "name": "string",
        "description": "string",
        "startDate": "string (ISO 8601)",
        "endDate": "string (ISO 8601)"
    }
    ```

- **Response Body**:

    ```json
    {
        "id": "number",
        "userId": "number",
        "name": "string",
        "stage": "number",
        "taskDetail": {
            "description": "string",
            "expectedStartDate": "string (ISO 8601)",
            "expectedEndDate": "string (ISO 8601)",
            "id": "number"
        }
    }
    ```

---

### 4. Listagem de Tarefas (Autenticado)

**URL**: `GET http://localhost:3333/api/users/:userId/tasks`

Essa rota retorna todas as tarefas associadas a um determinado usuário.

- **Headers**:
    - `Authorization: Bearer {token}`

- **Response Body**:

    ```json
    [
        {
            "id": "number",
            "userId": "number",
            "name": "string",
            "stage": "number",
            "taskDetail": {
                "id": "number",
                "expectedStartDate": "string (ISO 8601)",
                "expectedEndDate": "string (ISO 8601)",
                "description": "string"
            }
        }
    ]
    ```

---

### 5. Deletar Tarefa (Autenticado)

**URL**: `DELETE http://localhost:3333/api/users/:userId/tasks/:taskId`

Essa rota deleta uma tarefa específica associada ao usuário.

- **Headers**:
    - `Authorization: Bearer {token}`

- **Response**: 
    - Status 204 (No Content)

---

### 6. Atualizar Tarefa (Autenticado)

**URL**: `PUT http://localhost:3333/api/users/:userId/tasks/:taskId`

Essa rota atualiza os detalhes de uma tarefa existente.

- **Headers**:
    - `Authorization: Bearer {token}`

- **Request Body**:

    ```json
    {
        "name": "string",
        "stage": "number",
        "taskDetail": {
            "description": "string",
            "expectedStartDate": "string (ISO 8601)",
            "expectedEndDate": "string (ISO 8601)"
        }
    }
    ```

- **Response Body**:

    ```json
    {
        "id": "number",
        "userId": "number",
        "name": "string",
        "stage": "number",
        "taskDetail": {
            "id": "number",
            "expectedStartDate": "string (ISO 8601)",
            "expectedEndDate": "string (ISO 8601)",
            "description": "string"
        }
    }
    ```

---

Lembre-se de que todas as rotas a partir do **item 3** exigem autenticação via token JWT. As requisições não autenticadas serão negadas com um erro 401 (Unauthorized).

