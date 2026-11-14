# Archive: Strapi Blog Frontend

A modern blog frontend built with **Next.js** that reads its content from a [Strapi CMS](https://github.com/Ro-hit-Sonar/strapi-backend), with member sign-up and login, a members-only page, and a WebGL particle hero.

[**Live demo**](https://strapi-frontend-gamma.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Strapi](https://img.shields.io/badge/Strapi-4945FF?style=flat&logo=strapi&logoColor=white)

<!-- Add a screenshot of the home page and blog here, e.g. ![Home](docs/home.png) -->

## Features

- **Blog** with a listing page and individual article pages, fed by the Strapi articles API
- **Authentication** (sign up, log in, user menu) using Strapi's built-in users and permissions
- **Members-only page** that prompts visitors to sign in
- **Animated hero** with a WebGL particle simulation (React Three Fiber and custom shaders)
- Responsive layout with light and dark themes

## Tech stack

- **Framework:** Next.js (App Router), React, TypeScript
- **Styling and UI:** Tailwind CSS, shadcn/ui (Radix UI)
- **3D:** React Three Fiber, Drei, custom GLSL shaders
- **CMS:** Strapi (REST API)
- **Hosting:** Vercel

## Getting started

Requires Node.js 18+ and [pnpm](https://pnpm.io/). You also need a running Strapi backend, such as [strapi-backend](https://github.com/Ro-hit-Sonar/strapi-backend), with some published articles.

```bash
git clone https://github.com/Ro-hit-Sonar/strapi-frontend.git
cd strapi-frontend
pnpm install
```

Create a `.env.local` file pointing at your Strapi instance:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Then run:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  page.tsx              Home page with the hero
  blog/                 Article list and article pages
  gold/                 Members-only page
components/
  auth/                 Login, sign-up and user menu
  gl/                   WebGL particle effect and shaders
lib/
  api.ts                Strapi content requests
  auth.ts               Strapi authentication requests
```

## Author

Built by [Rohit Sonar](https://github.com/Ro-hit-Sonar).
