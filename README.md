# Sistema de Moeda Estudantil

Projeto desenvolvido como parte do Laboratório de Desenvolvimento de Software 

> Um ecossistema de recompensas que incentiva mérito acadêmico por meio de uma moeda virtual. Professores reconhecem alunos com moedas; alunos trocam moedas por vantagens oferecidas por empresas parceiras.

---

## 🎯 Objetivo

Promover o reconhecimento do desempenho estudantil através de uma moeda virtual que conecta **alunos**, **professores** e **empresas parceiras**, estimulando engajamento, desempenho e parcerias locais.

## 🧩 Funcionalidades Principais

### 👨‍🏫 Professores

* Recebem **1.000 moedas por semestre** (saldo acumulável).
* Podem enviar moedas aos alunos com motivo (mensagem/justificativa).
* Consultam saldo e extrato de transações.

### 🎓 Alunos

* Cadastro com dados pessoais e instituição.
* Recebem moedas e notificações por e-mail.
* Consultam saldo e histórico de transações.
* Resgatam moedas por vantagens (descontos, produtos, etc.) — recebem cupom digital e código de conferência.

### 🏢 Empresas Parceiras

* Cadastro com nome, descrição e lista de vantagens.
* Cada vantagem tem descrição, foto e custo em moedas.
* Recebem e-mail ao ocorrer resgate com código de conferência.

### 🔐 Autenticação

* Login e senha para todos os perfis (Aluno, Professor, Empresa).
* Acesso protegido para áreas restritas.

---
##  🏗️ Arquitetura e Tecnologias

* **Padrão arquitetural:** DTO (Data Transfer Object)
* **Back-end:** Spring Boot
* **Banco de dados:** Supabase
* **Front-end:** Next.js
* **Gerenciamento de dependências:** Maven
* **Controle de versão:** GitHub



## 📦 Como rodar (instruções rápidas)

#### 📋 Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Git  
- JDK 17 ou superior  
- Node.js v18 ou superior  
- Maven (geralmente já vem integrado em IDEs como IntelliJ e VS Code)  
- Um editor de código de sua preferência (ex: VS Code, IntelliJ IDEA)  

---

#### ⚙ Configuração do Ambiente
Siga os passos abaixo para configurar o ambiente de desenvolvimento.

#### 1. Clonar o Repositório
```bash
git clone https://SEU-LINK-DO-REPOSITORIO-AQUI.git
cd NOME-DA-PASTA-DO-PROJETO
```

#### 2. Configurar o Banco de Dados (Supabase)

Este projeto espera que as tabelas usuarios, carros e aluguel já existam no seu banco de dados Supabase.
Certifique-se de que as colunas e os relacionamentos foram criados conforme o desenvolvimento.

#### 3. Configurar o Backend (Spring Boot)

O backend precisa das credenciais para se conectar ao seu banco de dados.

Navegue até a pasta do backend (ex: backend/ ou aluguel-carros/).

Vá para o diretório src/main/resources/.

Crie uma cópia do arquivo application.properties.example e renomeie-a para application.properties.

Abra o novo arquivo e preencha com as suas credenciais do Supabase:

##### URL de conexão com o banco de dados PostgreSQL do Supabase
spring.datasource.url=jdbc:postgresql://SEU_HOST_DO_SUPABASE:5432/postgres

##### Usuário do banco (geralmente 'postgres')
spring.datasource.username=postgres

##### Senha do seu banco de dados
spring.datasource.password=SUA_SENHA_DO_BANCO

##### Configurações do JPA/Hibernate
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

##### Chave secreta para a assinatura do Token JWT (gere uma chave segura)
api.security.token.secret=SUA_CHAVE_SECRETA_LONGA_E_SEGURA_AQUI

---


#### 4. Configurar o Frontend (Next.js)

O frontend precisa saber a URL do seu backend.

Navegue até a pasta do frontend (ex: frontend/).

Crie um arquivo chamado .env.local na raiz desta pasta.

Adicione a seguinte linha ao arquivo:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```


---

## 🚀 Pronto para Rodar

Para rodar a aplicação, você precisará iniciar o backend e o frontend em dois terminais separados.

Iniciar o Backend (Spring Boot)

Abra um terminal e navegue até a pasta do backend.
```bash
mvn clean install
```
Inicie o servidor:
```bash
mvn spring-boot:run
```
➡️ O servidor backend estará rodando em http://localhost:8080


### Iniciar o Frontend (Next.js)

Abra um novo terminal e navegue até a pasta do frontend.

Instale as dependências do projeto:
```bash
npm install
```
Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
➡️ A aplicação frontend estará acessível em http://localhost:3000

Agora, basta abrir o navegador em http://localhost:3000 para usar o sistema 🚀



---

## 👥 Equipe

Fernanda Soares Oliveira Cunha 

Gabriel Reis Lebron


---

## 📚 Professor Responsável

**João Paulo Carneiro Aramuni** — Disciplina: Laboratório de Desenvolvimento de Software (Curso: Engenharia de Software)

---

## 🏁 Status

**Release 1 — Concluído**

**Release 2 — Concluído**

**Release 3 — Em desenvolvimento**

