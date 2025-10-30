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

## 🏗️ Arquitetura e Tecnologias

* **Padrão arquitetural:** DTO (Data Transfer Object)
* **Back-end:** Spring Boot
* **Banco de dados:** Supabase
* **Front-end:** Next.js
* **Gerenciamento de dependências:** Maven
* **Controle de versão:** GitHub


## 🖇️ Modelo de Dados (resumo)

* **Usuário** (tipo: ALUNO | PROFESSOR | EMPRESA)

  * id, nome, email, senha(hashed), tipo, criadoEm
* **Aluno**

  * userId (FK), instituicao, matricula, notificacoes
* **Professor**

  * userId (FK), departamento, saldoSemestral
* **EmpresaParceira**

  * userId (FK), descricao, contato
* **Vantagem**

  * id, empresaId (FK), titulo, descricao, fotoUrl, custoMoedas, ativo
* **Transacao**

  * id, remetenteId (FK), destinatarioId (FK), tipo (CRÉDITO|DÉBITO|RESGATE), valor, motivo, data
* **Resgate**

  * id, alunoId (FK), vantagemId (FK), codigoConferencia, estado (PENDENTE|CONFIRMADO|CANCELADO), criadoEm

> Observação: manter logs/impressão de auditoria para transações financeiras virtuais.

## 🔌 Endpoints API (exemplos)

* `POST /api/auth/login` — autenticação
* `POST /api/auth/register` — registro de usuário (com role)
* `GET /api/alunos/{id}` — obter perfil do aluno
* `POST /api/professores/{id}/creditar` — creditar moedas a um aluno
* `GET /api/usuarios/{id}/extrato` — histórico de transações
* `POST /api/resgates` — criar resgate de vantagem
* `GET /api/empresas/{id}/vantagens` — listar vantagens

> Implementar validação e tratamento de erros consistente (HTTP 4xx/5xx) e respostas padronizadas.

## ✉️ Notificações e Códigos de Conferência

* Emails transacionais para:

  * Aluno: ao receber moedas / gerar cupom de resgate
  * Empresa: ao realizar resgate — inclui `codigoConferencia` (gerado criptograficamente)
* Cupom digital com QR code e código alfanumérico para conferência presencial.


## 📦 Como rodar (instruções rápidas)





## 👥 Equipe

Fernanda Soares Oliveira Cunha | Gabriel Reis Lebron


## 📚 Professor Responsável

**João Paulo Carneiro Aramuni** — Disciplina: Laboratório de Desenvolvimento de Software (Curso: Engenharia de Software)

## 🏁 Status

**Release 1 — Concluído**
**Release 1 — Em desenvolvimento**

---



---

> Quer que eu gere também: `CONTRIBUTING.md`, `API.md` (documentação OpenAPI/Swagger), ou um `CHANGELOG.md` com convenção SemVer?
