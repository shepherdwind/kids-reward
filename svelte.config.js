import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
export const generateSW = process.env.GENERATE_SW === 'true'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    alias: {
      $database: './src/database',
    },
    adapter: adapter(),
    serviceWorker: {
      register: false,
    },
    files: {
      serviceWorker: generateSW ? undefined : 'src/sw.ts',
    },
  },
  preprocess: vitePreprocess(),
}

export default config
