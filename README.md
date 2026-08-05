# Academic Research Metadata Repository

An interactive academic research explorer for browsing papers, authors, journals, research areas, citation rankings, and repository statistics.

This is a real front-end application, not a static HTML mock-up. It was built as a clean portfolio/class-project starter with a modern, easy-to-follow stack and sample research metadata you can replace with your own.

## Stack

- **React 18** for the interface
- **TypeScript** for safer application code
- **Vite** for local development and production builds
- **Tailwind CSS** for responsive styling
- **React Router** with hash routing, so GitHub Pages works without server configuration
- **Recharts** for the statistics visualization
- **Lucide React** for interface icons

## What is included

- Repository overview with live collection totals
- Paper browser with subject filtering
- Search across titles, authors, journals, and subjects
- Author, journal, and subject directories
- Citation ranking explorer
- Citation-by-subject chart
- Responsive layout that works on smaller screens

## Run locally

You need Node.js 20 or later.

```bash
npm install
npm run dev
```

Vite will print a local URL to open in your browser.

To check the production build locally:

```bash
npm run build
npm run preview
```

## Publish to GitHub Pages

You can upload or push this project straight to a GitHub repository. The included workflow builds and deploys the app automatically.

1. Create a GitHub repository and upload all project files except `node_modules` and `dist`.
2. Open **Settings → Pages**.
3. For **Build and deployment**, select **GitHub Actions**.
4. Push to the `main` branch. The workflow in `.github/workflows/deploy.yml` will build the site and publish it.

The site uses hash URLs (for example, `#/papers`), which is why direct links keep working on GitHub Pages.

## Project structure

```text
src/
  App.tsx                 Routes, pages, components, and interactions
  data/repository.ts      Sample repository data
  index.css               Tailwind entry point and shared styles
.github/workflows/        GitHub Pages deployment
```

## Customize it

Start with [`src/data/repository.ts`](src/data/repository.ts). Replace the sample records with your own data, then expand the data layer to call an API when you are ready for a database-backed version.

The application keeps the UI and data separate, so moving from sample data to a REST API or Supabase/Firebase backend is straightforward.
