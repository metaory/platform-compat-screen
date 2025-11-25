import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  base: process.env.GITHUB_PAGES === 'true' ? '/platform-compat-screen/' : '/',
  markdown: {
    shikiConfig: {
      theme: 'solarized-light',
    },
  },
});
