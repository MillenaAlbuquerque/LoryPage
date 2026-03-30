<h1 align="center">
  🌿 Lory Cavalcante — Nutricionista
</h1>

<p align="center">
  Landing page profissional desenvolvida para a nutricionista <strong>Lory Cavalcante</strong>,
  com foco em apresentação de serviços, depoimentos de pacientes e facilidade de contato.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-black?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Deploy-GitHub_Pages-222?style=for-the-badge&logo=github&logoColor=white" />
</p>

---

## ✨ Funcionalidades

- **Hero com parallax** — imagem de fundo com efeito de profundidade via Locomotive Scroll
- **Navbar inteligente** — transparente no topo e com blur ao rolar; menu hambúrguer no mobile
- **Sobre Mim** — seção com foto, texto e animação de hover
- **Especialidades** — grid de cards animados com modal de expansão via Framer Motion
- **Depoimentos** — avaliações de pacientes com animações de entrada progressiva
- **Contato** — links diretos para Instagram, WhatsApp e e-mail, além de mapa integrado
- **Totalmente responsivo** — layout otimizado para mobile e desktop

---

## 🛠️ Stack

| Tecnologia | Uso |
|---|---|
| [React 19](https://react.dev/) | Biblioteca de UI |
| [Vite](https://vitejs.dev/) | Bundler e dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilização utilitária |
| [Framer Motion](https://www.framer.com/motion/) | Animações e transições |
| [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/) | Scroll suave com parallax |
| [Lucide React](https://lucide.dev/) | Ícones |
| [React Icons](https://react-icons.github.io/react-icons/) | Ícones de redes sociais |
| [GitHub Pages](https://pages.github.com/) | Hospedagem |

---

## 📁 Estrutura do Projeto

```
front/
├── public/
└── src/
    ├── assets/                 # Imagens e mídias
    ├── components/
    │   ├── Navbar.jsx          # Barra de navegação responsiva
    │   ├── Landing.jsx         # Seção hero com parallax
    │   ├── SobreMim.jsx        # Apresentação pessoal
    │   ├── Especialidades.jsx  # Área de atuação
    │   ├── Card.jsx            # Cards animados com modal
    │   ├── Depoimentos.jsx     # Avaliações de pacientes
    │   ├── Contato.jsx         # Informações de contato
    │   ├── Mapa.jsx            # Mapa integrado
    │   └── Footer.jsx          # Rodapé
    ├── contexts/
    │   └── ScrollContext.jsx   # Contexto global do Locomotive Scroll
    ├── App.jsx
    └── main.jsx
```

---

## 🚀 Como rodar localmente

**Pré-requisitos:** Node.js 18+ e npm instalados.

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/LoryPage.git

# Acesse a pasta do projeto
cd LoryPage/front

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173/LoryPage/` no navegador.

---

## 📦 Build e Deploy

```bash
# Gerar build de produção
npm run build

# Publicar no GitHub Pages (executa o build automaticamente)
npm run deploy
```

O site é publicado automaticamente na branch `gh-pages` e fica disponível em:
`https://millenaalbuquerque.github.io/LoryPage/`

---

## 📱 Seções da Página

| Seção | Âncora | Descrição |
|---|---|---|
| Início | `#inicio` | Hero com apresentação e CTAs |
| Sobre Mim | `#sobre` | Foto e trajetória profissional |
| Especialidades | `#especialidades` | Áreas de atuação com cards |
| Depoimentos | `#depoimentos` | Avaliações de pacientes |
| Contato | `#contato` | WhatsApp, Instagram, e-mail e mapa |

---

## 🔮 Melhorias Futuras

- [ ] **Deploy em produção** — publicar o site em domínio próprio (ex: `lorycavalcante.com.br`)
- [ ] **API de agendamento** — backend para que pacientes possam marcar consultas diretamente pela página, sem precisar de WhatsApp ou e-mail
- [ ] **Notificações automáticas** — envio de confirmação e lembrete de consulta por e-mail ou WhatsApp

---

## Autores

| Nome | GitHub |
|---|---|
| Millena Albuquerque | [@MillenaAlbuquerque](https://github.com/MillenaAlbuquerque) |
| Rafael Costrov | [@rafaelcostrov](https://github.com/rafaelcostrov) |


