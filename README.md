# Desafio Técnico AutoMax

Este projeto é um exemplo de aplicação full-stack usando **FastAPI** (backend) e **React + Vite** (frontend), rodando via **Docker**.  
O backend consome dados da [Fake Store API](https://fakestoreapi.com/carts) e os expõe via endpoints RESTful.

---

## Tecnologias

- **Backend:** Python 3.12, FastAPI, Uvicorn, SQLAlchemy (ou outro ORM, se aplicável)
- **Frontend:** React, Vite, Styled Components
- **Docker:** Containers para backend e frontend
- **Banco de dados:** Local (SQLite ou outro)

---

## Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Rodando a aplicação

1. Clone este repositório:

```
git clone https://github.com/thaynararm/desafio-automax.git
cd desafio-automax
```

2. Suba os containers via Docker Compose:

```
docker-compose up --build
```

⚠️ Na primeira execução, o Docker instalará dependências do backend e frontend, pode levar alguns minutos.


3. Acesse a aplicação:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Documentação da API (Swagger): http://localhost:8000/docs

### Observações

O frontend Vite roda na porta 5173 e o backend FastAPI na porta 8000.

Se quiser parar os containers:
```
docker-compose down
```

Para reiniciar sem rebuild:
```
docker-compose up
```

---

## Estrutura de comandos

Backend:
- Instala dependências e inicia o servidor FastAPI com hot reload:

Frontend:
- Instala dependências e inicia o servidor Vite:

---

## Autora
Thaynara Rodrigues Martins
