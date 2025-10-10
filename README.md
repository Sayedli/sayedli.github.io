# Sayed Ali — Portfolio

A personal site for Sayed Ali showcasing software engineering work, experience, and writing. The site is built with Gatsby 5 and styled with Tailwind CSS plus a custom neural-field animation.

[Live site](https://sayedli.github.io/)

## Tech Stack

- Gatsby 5 (React 18)
- Tailwind CSS 4
- Custom Canvas animation for interactive background
- Deployment via GitHub Pages (`gh-pages`)

## Getting Started

```bash
npm install
npm run develop
```

The dev server runs at `http://localhost:8000` with hot reload enabled.

## Production Build

```bash
npm run build
```

The optimized static site is emitted to the `public/` directory.

## Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the site and publishes the `public/` directory to the `gh-pages` branch. Ensure the repository is named `sayedli.github.io` so GitHub Pages serves it from `https://sayedli.github.io/`.

## Project Structure

- `src/pages/index.js` – Landing page content and hero animation hooks
- `src/styles/global.css` – Global styles layered over Tailwind
- `gatsby-config.js` – Gatsby metadata and plugin configuration

## License

Copyright © Sayed Ali. All rights reserved.
