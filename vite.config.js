import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, loadEnv } from 'vite'
import dotenvExpand from 'dotenv-expand';

export default defineConfig(({ mode }) => {
  // Only modify process.env in development mode
  if (mode === 'development') {
    const env = loadEnv(mode, process.cwd(), '');
    dotenvExpand.expand({ parsed: env });
  }
 
  return {
    plugins: [sveltekit()],
  };
});
