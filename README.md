<div align="center">

# Total Software — Website

**Institutional website of Total Software, a software studio from Saquarema, Brazil.**

🇧🇷 [Leia em português](README.pt-BR.md)

![React](https://img.shields.io/badge/React--61DAFB?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite--646CFF?logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS--06B6D4?logo=tailwindcss&logoColor=white)

**Live:** https://totalsoftware.com.br

</div>

## About

Single-page React site presenting the company's services, products, portfolio, clients, team and values, plus a contact page and a client portal that talks to the company API.

## Features

- Pages: Home, Services, Products, Portfolio (with detail pages), Clients, Team, Values, Contact
- Client portal backed by `VITE_API_URL`
- Animated UI with Framer Motion and NumberFlow counters
- ZIP-code lookup (ViaCEP) on forms

## Tech stack

| Layer | Technology |
|---|---|
| Front-end | React, React Router, TypeScript, Vite |
| UI | Tailwind CSS 4, Framer Motion, Lucide |

## Getting started

**Prerequisites:** Node.js 20+

```bash
npm install
echo "VITE_API_URL=http://localhost:3000" > .env   # only needed for the client portal
npm run dev        # http://localhost:5173
```

### Environment variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the API used by the client portal |

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview the build |

## Team

- [Vinicius do Valle](https://github.com/vallevinicius)
- [Vinícius Diller](https://github.com/viniciusdiller)
