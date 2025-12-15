import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://goodchristmasideas.com',
  adapter: vercel(),
  integrations: [
    tailwind(),
    mdx(),
    sitemap()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});
