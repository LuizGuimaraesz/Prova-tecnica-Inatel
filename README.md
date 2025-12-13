# Prova Técnica – Inatel

Este repositório foi criado para armazenar um projeto feito para avaliação técnica.

---

## 📌 Descrição do Projeto

O projeto consiste em uma **API REST para gerenciamento de tarefas de usuários**.

Cada usuário pode possuir várias tarefas (relacionamento **1:N**), e o sistema permite realizar as operações básicas de um CRUD:

- Criar tarefas
- Listar tarefas
- Atualizar tarefas
- Deletar tarefas

O frontend consome os dados da API.

---

## 🛠️ Tecnologias Utilizadas

### Backend

- Python
- Flask
- SQLAlchemy
- Banco de dados relacional (SQlite)

### Frontend

- HTML
- CSS
- JavaScript

---

## 🚀 Como Rodar o Projeto

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/Prova-tecnica-Inatel.git
cd Prova-tecnica-Inatel
```

---

## ⚙️ Rodando o Backend (API)

### 2️⃣ Acessar a pasta do backend

```bash
cd backend
```

---

### 3️⃣ Criar o ambiente virtual

```bash
python -m venv venv
```

---

### 4️⃣ Ativar o ambiente virtual

**Windows**

```bash
venv\Scripts\activate
```

**Linux / macOS**

```bash
source venv/bin/activate
```

---

### 5️⃣ Instalar as dependências do projeto

```bash
pip install -r requirements.txt
```

---

### 6️⃣ Configurar o banco de dados

Entre no flask shell:

```bash
flask shell
```

Crie o banco de dados:

```bash
db.create_all()
db.session.commit()
exit()
```

---

### 7️⃣ Rodar a API

Com o ambiente virtual ativo, execute:

```bash
python app.py
```

Após iniciar, a API estará disponível em:

```
http://localhost:5000
```

Você pode testar a API utilizando o navegador ou ferramentas como **Postman** ou **Insomnia**.

---
