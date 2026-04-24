# Lory Backend — Documentação Técnica

> API REST para agendamento de consultas com integração ao Google Calendar e Gmail.

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Arquitetura](#2-arquitetura)
3. [Estrutura do Projeto](#3-estrutura-do-projeto)
4. [Backend](#4-backend)
   - [4.1 Endpoints da API](#41-endpoints-da-api)
   - [4.2 Regras de Negócio](#42-regras-de-negócio)
   - [4.3 Segurança](#43-segurança)
5. [Guia para Frontend](#5-guia-para-frontend)
   - [5.1 Consumo da API](#51-consumo-da-api)
   - [5.2 Autenticação](#52-autenticação)
   - [5.3 Fluxo de Uso](#53-fluxo-de-uso)
6. [Exemplos de Uso](#6-exemplos-de-uso)
7. [Como Rodar o Projeto](#7-como-rodar-o-projeto)
8. [Variáveis de Ambiente](#8-variáveis-de-ambiente)
9. [Observações Técnicas](#9-observações-técnicas)

---

## 1. Visão Geral

### Descrição

O **Lory Backend** é uma API REST desenvolvida em Python com Flask que serve como backend para um sistema de agendamento de consultas. O sistema permite que clientes consultem horários disponíveis e agendem consultas (presenciais ou online) diretamente na agenda de um profissional via Google Calendar.

### Objetivo

Automatizar o fluxo de agendamento de consultas: verificar disponibilidade em tempo real na agenda do Google Calendar, criar eventos com suporte a Google Meet (para consultas online) e enviar e-mails de confirmação personalizados ao cliente.

### Principais Funcionalidades

- Consulta de horários disponíveis nos próximos 30 dias
- Agendamento de consultas presenciais ou online (com link Google Meet)
- Envio automático de e-mail de confirmação ao cliente (com cópia ao profissional)
- Proteção de endpoints via token temporário assinado + reCAPTCHA v3
- Rate limiting para prevenção de abuso

---

## 2. Arquitetura

### Estilo Arquitetural

A aplicação segue uma arquitetura **monolítica com separação em camadas de serviço** (Service Layer Pattern):

```
┌─────────────────────────────────────────────┐
│                  Flask App                  │
│              (app.py — Routes)              │
└──────────────┬──────────────────────────────┘
               │
    ┌──────────▼──────────┐
    │    Service Layer    │
    │  ┌───────────────┐  │
    │  │calendar_svc   │  │  ← Google Calendar API
    │  │gmail_svc      │  │  ← Gmail API
    │  │google_svc     │  │  ← Auth (Service Account)
    │  │validation_svc │  │  ← Token + reCAPTCHA
    │  └───────────────┘  │
    └─────────────────────┘
```

### Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| Python | 3.10+ | Linguagem principal |
| Flask | latest | Framework web |
| flask-cors | latest | Suporte a CORS |
| flask-limiter | latest | Rate limiting por IP |
| itsdangerous | latest | Geração/validação de tokens assinados |
| python-dotenv | latest | Carregamento de variáveis de ambiente |
| google-auth | latest | Autenticação OAuth2 / Service Account |
| google-api-python-client | latest | Clientes das APIs do Google |
| requests | latest | Validação do reCAPTCHA |
| holidays | latest | (Importado, uso comentado) |

---

## 3. Estrutura do Projeto

```
backend/
├── app.py                          # Ponto de entrada: definição das rotas Flask
├── requirements.txt                # Dependências Python do projeto
├── .env                            # Variáveis de ambiente (não versionar)
│
├── services/
│   ├── calendar_service.py         # Integração com Google Calendar API
│   ├── gmail_service.py            # Integração com Gmail API
│   ├── google_service.py           # Fábrica de clientes autenticados Google
│   └── validation_service.py       # Validação de token e reCAPTCHA
│
└── templates/
    ├── template_email.html          # Template HTML para e-mail presencial
    ├── template_email_online.html   # Template HTML para e-mail de consulta online
    └── test_recaptcha.html          # Página de teste da integração
```

### Responsabilidade de cada arquivo

| Arquivo | Responsabilidade |
|---|---|
| `app.py` | Define as rotas HTTP, aplica middlewares (autenticação, rate limiting) e orquestra chamadas aos serviços |
| `services/google_service.py` | Cria e retorna clientes autenticados para Calendar e Gmail usando Service Account |
| `services/calendar_service.py` | Consulta horários livres e cria eventos no Google Calendar |
| `services/gmail_service.py` | Constrói e envia e-mails de confirmação via Gmail API |
| `services/validation_service.py` | Valida o token temporário (itsdangerous) e o token do reCAPTCHA v3 |
| `templates/*.html` | Templates de e-mail com placeholders `{{DATA}}`, `{{HORA}}`, `{{LINK_*}}` |

---

## 4. Backend

### 4.1 Endpoints da API

#### `GET /init`

Gera um **token temporário assinado** que deve ser usado para autenticar as demais chamadas.

| Propriedade | Valor |
|---|---|
| Método | `GET` |
| URL | `/init` |
| Autenticação | Nenhuma |
| Rate Limit | 10 por minuto por IP |

**Resposta de sucesso (`200 OK`):**

```json
{
  "token": "MTc0NTAwMDAwMC4w.xyz...",
  "expires_in": 600
}
```

| Campo | Tipo | Descrição |
|---|---|---|
| `token` | `string` | Token assinado com HMAC. Expira em 600 segundos (10 minutos) |
| `expires_in` | `integer` | Validade do token em segundos |

---

#### `GET /`

Retorna os **horários disponíveis** para agendamento nos próximos 30 dias.

| Propriedade | Valor |
|---|---|
| Método | `GET` |
| URL | `/` |
| Autenticação | Bearer Token (obrigatório) |
| reCAPTCHA | Header `X-Recaptcha-Token` (obrigatório) |
| Rate Limit | 10 por minuto por IP |

**Headers obrigatórios:**

```
Authorization: Bearer <token_obtido_em_/init>
X-Recaptcha-Token: <token_recaptcha_v3>
```

**Resposta de sucesso (`200 OK`):**

```json
{
  "data_min": "2026-04-13",
  "data_max": "2026-05-13",
  "disponiveis": [
    {
      "data": "2026-04-14",
      "horas_vagas": ["08:00", "09:00", "10:00", "11:00"]
    },
    {
      "data": "2026-04-15",
      "horas_vagas": ["08:00", "10:00", "14:00"]
    }
  ]
}
```

| Campo | Tipo | Descrição |
|---|---|---|
| `data_min` | `string` | Data inicial da janela de busca (hoje) — formato `YYYY-MM-DD` |
| `data_max` | `string` | Data final da janela de busca (hoje +30 dias) — formato `YYYY-MM-DD` |
| `disponiveis` | `array` | Lista de dias com horários livres |
| `disponiveis[].data` | `string` | Data do dia disponível — formato `YYYY-MM-DD` |
| `disponiveis[].horas_vagas` | `array<string>` | Lista de horários livres no dia — formato `HH:MM` |

**Respostas de erro:**

| Código | Mensagem | Causa |
|---|---|---|
| `401` | `Token ausente` | Header `Authorization` não enviado |
| `403` | `Token inválido ou expirado` | Token expirado (>10 min) ou assinatura inválida |
| `403` | `ReCAPTCHA inválido` | Token reCAPTCHA ausente, inválido ou score < 0.5 |
| `503` | `Não foi possível consultar os horários disponíveis` | Falha na comunicação com Google Calendar API |

---

#### `POST /agendar`

Cria um **evento no Google Calendar** e envia **e-mail de confirmação** ao cliente.

| Propriedade | Valor |
|---|---|
| Método | `POST` |
| URL | `/agendar` |
| Content-Type | `application/json` |
| Autenticação | Bearer Token (obrigatório) |
| reCAPTCHA | Header `X-Recaptcha-Token` (obrigatório) |
| Rate Limit | 10 por minuto por IP |

**Headers obrigatórios:**

```
Authorization: Bearer <token_obtido_em_/init>
X-Recaptcha-Token: <token_recaptcha_v3>
Content-Type: application/json
```

**Body da requisição:**

```json
{
  "data": "14/04/2026",
  "hora": "09:00",
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "online": true,
  "duracao": 60
}
```

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `data` | `string` | Sim | Data da consulta no formato `DD/MM/AAAA` |
| `hora` | `string` | Sim | Horário no formato `HH:MM` |
| `nome` | `string` | Sim | Nome completo do paciente |
| `email` | `string` | Sim | E-mail do paciente para envio da confirmação |
| `online` | `boolean` | Não | `true` para consulta online (Google Meet). Padrão: `false` |
| `duracao` | `integer` | Não | Duração em minutos. Padrão: `60` |

**Resposta de sucesso (`200 OK`) — consulta online:**

```json
{
  "id": "abc123xyz",
  "status": "confirmed",
  "htmlLink": "https://www.google.com/calendar/event?eid=...",
  "summary": "Consulta Agendada - Maria Silva",
  "start": { "dateTime": "2026-04-14T09:00:00-03:00" },
  "end": { "dateTime": "2026-04-14T10:00:00-03:00" },
  "conferenceData": {
    "entryPoints": [
      { "uri": "https://meet.google.com/xxx-yyyy-zzz", "entryPointType": "video" }
    ]
  }
}
```

> Em caso de falha no envio do e-mail (não impede o agendamento), a resposta incluirá o campo adicional:
> ```json
> { "aviso": "Consulta agendada, mas não foi possível enviar o e-mail de confirmação." }
> ```

**Respostas de erro:**

| Código | Mensagem | Causa |
|---|---|---|
| `400` | `Corpo da requisição ausente ou inválido` | Body não é JSON válido |
| `400` | `Data ou hora ausente` | Campos `data` ou `hora` não enviados |
| `400` | `Nome ou e-mail ausente` | Campos `nome` ou `email` não enviados |
| `401` | `Token ausente` | Header `Authorization` não enviado |
| `403` | `Token inválido ou expirado` | Token inválido ou expirado |
| `403` | `ReCAPTCHA inválido` | Token reCAPTCHA inválido ou score < 0.5 |
| `500` | `Não foi possível agendar a consulta` | Google retornou status diferente de `confirmed` |
| `503` | `Não foi possível agendar a consulta` | Falha na comunicação com Google Calendar API |

---

#### `GET /test`

Renderiza uma **página de testes interativa** para validar o fluxo de autenticação e agendamento diretamente no browser.

| Propriedade | Valor |
|---|---|
| Método | `GET` |
| URL | `/test` |
| Autenticação | Nenhuma |

> Uso exclusivo para desenvolvimento/diagnóstico. Não expor em produção.

---

### 4.2 Regras de Negócio

#### Horários disponíveis

- A janela de consulta cobre **os próximos 30 dias** a partir da data atual.
- Apenas **dias úteis** (segunda a sexta) são considerados.
- Os slots são gerados no intervalo de **08:00 às 18:00** (horário de Brasília / `America/Sao_Paulo`).
- A granularidade dos slots é igual à duração da consulta (padrão: 60 minutos). Não há sobreposição.
- A disponibilidade é verificada em tempo real via **Google Calendar FreeBusy API**, comparando os slots gerados com os períodos já ocupados na agenda.
- Suporte a feriados brasileiros existe no código mas está **comentado** (`holidays.Brazil`).

#### Agendamento

- O evento é criado no Google Calendar com o título `"Consulta Agendada - {nome}"`.
- O cliente é adicionado como **attendee** do evento.
- Para consultas **online**: um link do **Google Meet** é gerado automaticamente via `conferenceData` e incluído no e-mail.
- Para consultas **presenciais**: o link do evento no Google Calendar (`htmlLink`) é incluído no e-mail.
- O e-mail é enviado ao cliente com **cópia (CC)** para o profissional.
- Falha no envio do e-mail **não** cancela o agendamento; a consulta é criada normalmente e um `aviso` é retornado.

#### Formato de data no agendamento

- O campo `data` deve estar no formato brasileiro `DD/MM/AAAA` (ex: `14/04/2026`).
- O campo `hora` deve estar no formato `HH:MM` (ex: `09:00`).
- A resposta de `GET /` retorna datas no formato ISO `YYYY-MM-DD` — faça a conversão no frontend antes de chamar `POST /agendar`.

---

### 4.3 Segurança

#### Modelo de autenticação — Token temporário (itsdangerous)

O sistema utiliza **tokens HMAC assinados** com `itsdangerous.TimestampSigner`:

```
Fluxo:
1. Frontend chama GET /init
2. Backend assina timestamp atual com SECRET_KEY
3. Frontend armazena o token (válido por 10 minutos)
4. Frontend envia token no header Authorization: Bearer <token>
5. Backend verifica assinatura e validade (max_age=600s)
```

- O token **não carrega dados de usuário** — é apenas uma prova de que o frontend obteve um token recente e válido.
- Expirado após **600 segundos** (10 minutos) — resposta `403`.
- Assinatura inválida (adulterada) — resposta `403`.

#### reCAPTCHA v3

Todos os endpoints protegidos exigem um token do **Google reCAPTCHA v3** no header `X-Recaptcha-Token`:

- O token é validado via `POST https://www.google.com/recaptcha/api/siteverify`
- O **score mínimo exigido é 0.5** (escala de 0.0 a 1.0)
- Score abaixo do limiar ou resposta inválida retorna `403`
- Timeout da requisição de verificação: **10 segundos**

#### Rate Limiting

| Endpoint | Limite |
|---|---|
| Todos (padrão) | 20 requisições/minuto por IP |
| `GET /init` | 10 requisições/minuto por IP |
| `GET /` | 10 requisições/minuto por IP |
| `POST /agendar` | 10 requisições/minuto por IP |

#### CORS

CORS está habilitado globalmente (`flask-cors`) permitindo requisições de qualquer origem. Restrinja as origens permitidas em produção conforme necessário.

#### Credenciais Google — Service Account

As APIs do Google (Calendar e Gmail) são acessadas via **Service Account** com **Domain-Wide Delegation**:

- As credenciais JSON são carregadas via variável de ambiente `GOOGLE_SERVICE_ACCOUNT_JSON` (nunca em disco).
- A Service Account **impersona** (`subject`) o e-mail do profissional para ler/escrever na sua agenda e enviar e-mails em seu nome.

---

## 5. Guia para Frontend

### 5.1 Consumo da API

**Base URL (desenvolvimento):**
```
http://localhost:5000
```

**Headers padrão para endpoints protegidos:**

```
Authorization: Bearer <token>
X-Recaptcha-Token: <recaptcha_token>
Content-Type: application/json
```

---

### 5.2 Autenticação

O sistema usa **dois fatores de proteção** combinados em cada requisição protegida:

1. **Token temporário** obtido em `GET /init` — válido por 10 minutos.
2. **Token reCAPTCHA v3** gerado no browser — deve ser gerado a cada chamada (ou reutilizado com cuidado).

#### Como obter e usar o token — exemplo em JavaScript

```javascript
// 1. Obtém o token de sessão da API
async function obterToken() {
  const res = await fetch('http://localhost:5000/init');
  const { token, expires_in } = await res.json();

  // Armazena na memória (não em localStorage para esta finalidade)
  sessionStorage.setItem('api_token', token);
  sessionStorage.setItem('api_token_exp', Date.now() + expires_in * 1000);

  return token;
}

// 2. Obtém o token do reCAPTCHA v3
// (requer que o script do reCAPTCHA já esteja carregado na página)
async function obterRecaptchaToken() {
  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute('SUA_SITE_KEY', { action: 'submit' })
        .then(resolve)
        .catch(reject);
    });
  });
}

// 3. Monta os headers de autenticação
async function headersAuth() {
  // Reutiliza o token se ainda válido
  const exp = sessionStorage.getItem('api_token_exp');
  const token = exp && Date.now() < Number(exp)
    ? sessionStorage.getItem('api_token')
    : await obterToken();

  const recaptchaToken = await obterRecaptchaToken();

  return {
    'Authorization': `Bearer ${token}`,
    'X-Recaptcha-Token': recaptchaToken,
    'Content-Type': 'application/json',
  };
}
```

> **Onde armazenar o token:** Use `sessionStorage` ou memória da aplicação (variável de módulo). Evite `localStorage` para tokens de curta duração. Nunca persista credenciais sensíveis.

#### Tratamento de expiração

O token expira em 10 minutos. Se a API retornar `403` com `"Token inválido ou expirado"`, solicite um novo token chamando `GET /init` novamente:

```javascript
async function chamadaProtegida(url, opcoes = {}) {
  const headers = await headersAuth();
  const res = await fetch(url, { ...opcoes, headers });

  if (res.status === 403) {
    const { erro } = await res.json();
    if (erro === 'Token inválido ou expirado') {
      // Renova o token e tenta novamente
      sessionStorage.removeItem('api_token');
      sessionStorage.removeItem('api_token_exp');
      const novosHeaders = await headersAuth();
      return fetch(url, { ...opcoes, headers: novosHeaders });
    }
  }

  return res;
}
```

---

### 5.3 Fluxo de Uso

```
Passo 1: Inicialização
  └─► GET /init
      ← { token, expires_in: 600 }
      └─► Armazenar token na sessão

Passo 2: Gerar reCAPTCHA
  └─► grecaptcha.execute(SITE_KEY, { action: 'submit' })
      ← recaptchaToken

Passo 3: Consultar horários
  └─► GET /
      Headers: Authorization + X-Recaptcha-Token
      ← { disponiveis: [...] }
      └─► Exibir calendário com horários disponíveis

Passo 4: Usuário seleciona data/hora e preenche formulário

Passo 5: Gerar novo reCAPTCHA (recomendado para /agendar)

Passo 6: Agendar consulta
  └─► POST /agendar
      Headers: Authorization + X-Recaptcha-Token
      Body: { data, hora, nome, email, online, duracao }
      ← Evento criado + e-mail enviado ao cliente
```

---

## 6. Exemplos de Uso

### Exemplo completo — buscar horários e agendar

```javascript
const BASE_URL = 'http://localhost:5000';
const RECAPTCHA_SITE_KEY = 'sua_site_key_aqui';

async function fluxoAgendamento() {
  // Passo 1: Obter token
  const initRes = await fetch(`${BASE_URL}/init`);
  const { token } = await initRes.json();

  // Passo 2: Obter reCAPTCHA
  const recaptchaToken = await new Promise(resolve =>
    window.grecaptcha.ready(() =>
      window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' }).then(resolve)
    )
  );

  const headers = {
    'Authorization': `Bearer ${token}`,
    'X-Recaptcha-Token': recaptchaToken,
    'Content-Type': 'application/json',
  };

  // Passo 3: Buscar horários disponíveis
  const horariosRes = await fetch(`${BASE_URL}/`, { headers });
  const { disponiveis } = await horariosRes.json();

  console.log('Dias disponíveis:', disponiveis);
  // [{ data: "2026-04-14", horas_vagas: ["08:00", "09:00", ...] }, ...]

  // Passo 4: Gerar novo token reCAPTCHA para o agendamento
  const recaptchaToken2 = await new Promise(resolve =>
    window.grecaptcha.ready(() =>
      window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' }).then(resolve)
    )
  );

  const headersAgendar = {
    'Authorization': `Bearer ${token}`,   // mesmo token (se ainda válido)
    'X-Recaptcha-Token': recaptchaToken2,
    'Content-Type': 'application/json',
  };

  // Passo 5: Agendar consulta
  // ATENÇÃO: converter data de YYYY-MM-DD para DD/MM/AAAA
  const dataISO = disponiveis[0].data;              // "2026-04-14"
  const [ano, mes, dia] = dataISO.split('-');
  const dataBR = `${dia}/${mes}/${ano}`;            // "14/04/2026"

  const agendarRes = await fetch(`${BASE_URL}/agendar`, {
    method: 'POST',
    headers: headersAgendar,
    body: JSON.stringify({
      data: dataBR,
      hora: disponiveis[0].horas_vagas[0],          // "08:00"
      nome: 'Maria Silva',
      email: 'maria@email.com',
      online: true,
      duracao: 60,
    }),
  });

  const evento = await agendarRes.json();

  if (agendarRes.ok) {
    console.log('Consulta agendada!', evento);
    if (evento.aviso) {
      console.warn(evento.aviso); // e-mail não enviado, mas agendamento OK
    }
  } else {
    console.error('Erro ao agendar:', evento.erro);
  }
}
```

### Exemplo com axios

```javascript
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000' });

async function agendarComAxios(nome, email, data, hora, online = false) {
  // 1. Token de sessão
  const { data: initData } = await api.get('/init');
  const token = initData.token;

  // 2. reCAPTCHA
  const recaptchaToken = await new Promise(resolve =>
    window.grecaptcha.ready(() =>
      window.grecaptcha.execute('SUA_SITE_KEY', { action: 'submit' }).then(resolve)
    )
  );

  // 3. Agendar
  const { data: evento } = await api.post('/agendar',
    { data, hora, nome, email, online },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Recaptcha-Token': recaptchaToken,
      },
    }
  );

  return evento;
}
```

---

## 7. Como Rodar o Projeto

### Pré-requisitos

- Python 3.10 ou superior
- Conta Google com:
  - Google Calendar API habilitada
  - Gmail API habilitada
  - Service Account configurada com Domain-Wide Delegation
- Projeto Google com reCAPTCHA v3 configurado

### Instalação

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd backend

# 2. Crie e ative o ambiente virtual
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

# 3. Instale as dependências
pip install -r requirements.txt
```

### Configuração

Crie o arquivo `.env` na raiz do projeto com as variáveis descritas na [seção 8](#8-variáveis-de-ambiente).

### Executar em desenvolvimento

```bash
flask run
# ou
python app.py
```

O servidor inicia em `http://localhost:5000`.

### Executar em produção

Use um servidor WSGI como **Gunicorn**:

```bash
pip install gunicorn
gunicorn app:app --bind 0.0.0.0:8000 --workers 2
```

---

## 8. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto. **Nunca versione este arquivo.**

```env
# Chave secreta para assinar os tokens temporários (qualquer string longa e aleatória)
SECRET_KEY=sua_chave_secreta_muito_segura_aqui

# Chave secreta do reCAPTCHA v3 (obtida no Google reCAPTCHA Admin Console)
SECRET_KEY_RECAPTCHA=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# JSON completo das credenciais da Service Account (em uma única linha)
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n","client_email":"nome@projeto.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}

# Escopos do Google Calendar (separados por vírgula, sem espaço)
SCOPES_CALENDAR=https://www.googleapis.com/auth/calendar

# Escopos do Gmail (separados por vírgula, sem espaço)
SCOPES_GMAIL=https://www.googleapis.com/auth/gmail.send

# E-mail do profissional (usado como calendarId e remetente dos e-mails)
EMAIL=profissional@gmail.com

# Nome de exibição do remetente nos e-mails
NOME_USER=Lory Cavalcante
```

### Como configurar a Service Account Google

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto (ou use um existente)
3. Habilite **Google Calendar API** e **Gmail API**
4. Em _IAM & Admin → Service Accounts_, crie uma Service Account
5. Gere e baixe a chave JSON
6. No [Google Workspace Admin](https://admin.google.com/), configure **Domain-Wide Delegation** para a Service Account com os escopos necessários
7. Cole o conteúdo do JSON em uma única linha na variável `GOOGLE_SERVICE_ACCOUNT_JSON`

---

## 9. Observações Técnicas

### Decisões de arquitetura

- **Token customizado vs. JWT:** O sistema usa `itsdangerous.TimestampSigner` em vez de JWT. Isso é suficiente para o propósito (prova de acesso recente ao `/init`), sem overhead de payload decodificável.
- **Service Account para Gmail:** O envio de e-mail é feito via Gmail API com a Service Account impersonando o e-mail do profissional. Isso evita necessidade de OAuth interativo e permite envio programático.
- **Slots gerados localmente:** Em vez de depender de uma API de slots, a disponibilidade é calculada subtraindo os períodos ocupados (da FreeBusy API) dos slots gerados localmente. Simples e eficaz para agendas individuais.

### Limitações conhecidas

- **Feriados desabilitados:** O código importa `holidays` mas o filtro por feriados está comentado. Slots em feriados nacionais brasileiros são exibidos normalmente.
- **Sem autenticação de usuário:** O sistema não possui login/cadastro de pacientes. O token serve apenas para proteger a API de uso não autorizado.
- **Duração fixa na consulta de horários:** `GET /` sempre usa `duracao_minutos=60`. Se desejar consultar para outra duração, é necessário adaptar a chamada.
- **Sem cancelamento de consultas:** Não existe endpoint para cancelar ou reagendar um evento criado.
- **CORS aberto:** `CORS(app)` está configurado sem restrição de origem. Em produção, restrinja para o domínio do frontend.

### Possíveis melhorias futuras

- Adicionar suporte a cancelamento/reagendamento via API
- Implementar filtro de feriados (o código já tem a estrutura, basta descomentar)
- Restringir CORS para origens específicas
- Adicionar endpoint de health check (`GET /health`)
- Parametrizar horário inicial/final e duração do slot na consulta de disponibilidade
- Adicionar persistência local (banco de dados) para cache de agendamentos e histórico
- Implementar webhook para notificações de alterações nos eventos do Google Calendar
