# visitor-registration

## Como rodar o projeto

1. Instale as dependências na raiz do projeto:
   ```bash
   npm install
   ```
 ```bash
   cd frontend
   npm install
   ```
 ```bash
   cd backend
   npm install
   ```
2. Rode backend e frontend juntos:
   ```bash
   npm run dev
   ```
   - O backend estará em http://localhost:3001
   - O frontend estará em http://localhost:3000

## Como criar um usuário admin no backend

1. Certifique-se de que o backend está rodando (`npm run dev` na raiz ou `node index.js` em `backend/`).
2. Faça uma requisição POST para `/usuarios`:
   - Usando curl:
     ```bash
     curl -X POST http://localhost:3001/usuarios \
       -H "Content-Type: application/json" \
       -d '{"nome": "Seu Nome", "email": "seunome@exemplo.com", "senha": "123456"}'
     ```
   - Ou use Postman/Insomnia para enviar, conforme o exemplo abaixo:
     - nome: Seu Nome
     - email: seunome@exemplo.com
     - senha: 123456

3. Use esse usuário para fazer login no frontend.

---

# English version

## How to run the project

1. Install dependencies in the project root:
```bash
   npm install
```
 ```bash
   cd frontend
   npm install
   ```
 ```bash
   cd backend
   npm install
   ```

2. Run backend and frontend together:
   ```bash
   npm run dev
   ```
   - Backend will be at http://localhost:3001
   - Frontend will be at http://localhost:3000

## How to create an admin user in the backend

1. Make sure the backend is running (`npm run dev` in the root or `node index.js` in `backend/`).
2. Make a POST request to `/usuarios`:
   - Using curl:
     ```bash
     curl -X POST http://localhost:3001/usuarios \
       -H "Content-Type: application/json" \
       -d '{"nome": "Your Name", "email": "yourname@example.com", "senha": "123456"}'
     ```
   - Or use Postman/Insomnia to send, as in the example below:
     - nome: Your Name
     - email: yourname@example.com
     - senha: 123456

3. Use this user to log in to the frontend.

