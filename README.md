# n8n RSS Pipeline Frontend Dashboard

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Yarn](https://img.shields.io/badge/Yarn-4-2C8EBB?logo=yarn&logoColor=white)](https://yarnpkg.com/)

This project builds the dashboard page defined in `n8n_frontend.html` as a React + TypeScript application.
The current implementation keeps the same UI and interaction flow while splitting the page into reusable components.

## What This Project Is

- A React implementation of the `n8n_frontend.html` keyword dashboard
- Period tabs (`3d`, `1w`, `1m`)
- Wordcloud/image area
- Top keyword ranking list
- Related article table for the selected keyword
- A local mock-data driven UI for frontend development

## HTML to React Mapping

- `n8n_frontend.html`: original single-file dashboard prototype (HTML/CSS/JS)
- `src/features/dashboard/Dashboard.tsx`: main page composition
- `src/features/dashboard/components/PeriodTabs.tsx`: period selector tabs
- `src/features/dashboard/components/WordcloudCard.tsx`: image panel
- `src/features/dashboard/components/KeywordRanking.tsx`: keyword ranking list
- `src/features/dashboard/components/ArticleTable.tsx`: related article table
- `src/features/dashboard/mockData.ts`: period/keyword/article sample data

## Tech Stack

- React 19 + TypeScript
- Vite 6 (SWC)
- Tailwind CSS 4
- React Router 7
- Redux Toolkit
- i18next (Korean/English resources included)

## Project Structure

```txt
src/
  app/
    api/                    # Axios clients + streaming helper
    router/                 # Router configuration
    store/redux/            # Redux store and hooks
  features/
    dashboard/              # Dashboard page and components
    Home.tsx                # Home feature entry
  pages/
    HomePage.tsx            # "/" route
    extra/                  # NotFound and helper pages
```

## Getting Started

### Prerequisites

- Node.js 20+
- Corepack enabled

```bash
corepack enable
```

### Install

```bash
yarn install
```

### Run

```bash
yarn dev
```

Default local URL: `http://localhost:6075`

## Scripts

- `yarn dev`: Start development server
- `yarn build`: Build production assets
- `yarn preview`: Preview production build
- `yarn lint`: Run ESLint
- `yarn test`: Run Vitest (watch mode)
- `yarn test:run`: Run Vitest once
- `yarn storybook`: Start Storybook

## API Notes

- API-related clients are in `src/app/api/client.tsx`.
- Current endpoint values are environment-specific placeholders.
- Replace `baseURL` values before deploying.

## Build Output

```bash
yarn build
```

- Output directory: `dist/`
- `robots.txt` is copied to `dist/` via Vite plugin
- Example server config: `nginx/nginx.conf`
