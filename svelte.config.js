import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    alias: {
      $database: './src/database',
    },
    adapter: adapter(),
  },
  preprocess: vitePreprocess(),
}

export default config
