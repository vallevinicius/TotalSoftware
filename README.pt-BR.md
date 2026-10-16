<div align="center">

# Total Software — Website

**Site institucional da Total Software, estúdio de software de Saquarema (RJ).**

🇺🇸 [Read in English](README.md)

![React](https://img.shields.io/badge/React--61DAFB?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite--646CFF?logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS--06B6D4?logo=tailwindcss&logoColor=white)

**Online:** https://totalsoftware.com.br

</div>

## Sobre

Site React de página única que apresenta serviços, produtos, portfólio, clientes, equipe e valores da empresa, além de página de contato e um portal do cliente que conversa com a API da empresa.

## Funcionalidades

- Páginas: Home, Serviços, Produtos, Portfólio (com página de detalhe), Clientes, Equipe, Valores, Fale Conosco
- Portal do cliente ligado a `VITE_API_URL`
- Interface animada com Framer Motion e contadores NumberFlow
- Busca de CEP (ViaCEP) nos formulários

## Stack

| Camada | Tecnologia |
|---|---|
| Front-end | React, React Router, TypeScript, Vite |
| UI | Tailwind CSS 4, Framer Motion, Lucide |

## Como rodar

**Pré-requisitos:** Node.js 20+

```bash
npm install
echo "VITE_API_URL=http://localhost:3000" > .env   # só necessário para o portal do cliente
npm run dev        # http://localhost:5173
```

### Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base da API usada pelo portal do cliente |

### Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Type-check e build de produção |
| `npm run preview` | Pré-visualiza o build |

## Equipe

- [Vinicius do Valle](https://github.com/vallevinicius)
- [Vinícius Diller](https://github.com/viniciusdiller)
