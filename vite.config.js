import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { htmlPrerender } from 'vite-plugin-html-prerender';
import path from 'path';
import { fileURLToPath } from 'url';
import { articles } from './src/articles.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// プリレンダー対象URLを動的に生成
const staticRoutes = ['/', '/column', '/guide', '/about', '/privacy', '/contact'];
const articleRoutes = articles.map((a) => `/article/${a.slug}`);
const allRoutes = [...staticRoutes, ...articleRoutes];

export default defineConfig({
  plugins: [
    react(),
    htmlPrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: allRoutes,
      selector: '#root',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
});