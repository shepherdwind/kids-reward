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
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
      __RELOAD_SW__: false,
    },
    plugins: [
      sveltekit(),
      // SvelteKitPWA({
      //   srcDir: './src',
      //   mode: 'development',
      //   // you don't need to do this if you're using generateSW strategy in your app
      //   strategies: generateSW ? 'generateSW' : 'injectManifest',
      //   // you don't need to do this if you're using generateSW strategy in your app
      //   filename: generateSW ? undefined : 'sw.ts',
      //   scope: '/',
      //   base: '/',
      //   selfDestroying: process.env.SELF_DESTROYING_SW === 'true',
      //   pwaAssets: {
      //     config: true,
      //   },
      //   manifest: {
      //     short_name: 'SvelteKit PWA',
      //     name: 'SvelteKit PWA',
      //     start_url: '/',
      //     scope: '/',
      //     display: 'standalone',
      //     theme_color: "#ffffff",
      //     background_color: "#ffffff"
      //   },
      //   injectManifest: {
      //     globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
      //   },
      //   // workbox: {
      //   //   globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
      //   // },
      //   devOptions: {
      //     enabled: false,
      //     suppressWarnings: process.env.SUPPRESS_WARNING === 'true',
      //     type: 'module',
      //     navigateFallback: '/',
      //   },
      //   // if you have shared info in svelte config file put in a separate module and use it also here
      //   kit: {
      //     includeVersionFile: true,
      //   }
      // })


      /*
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
          type: 'module',
        },
        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
          'mask-icon.svg',
          'pwa-64x64.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'maskable-icon-512x512.png'
        ],
        manifest: {
          name: 'Kids Reward',
          short_name: 'Reward',
          description: 'Kids reward system, to help parents motivate their kids',
          theme_color: '#ffffff',
          "icons": [
            {
              "src": "pwa-64x64.png",
              "sizes": "64x64",
              "type": "image/png"
            },
            {
              "src": "pwa-192x192.png",
              "sizes": "192x192",
              "type": "image/png"
            },
            {
              "src": "pwa-512x512.png",
              "sizes": "512x512",
              "type": "image/png"
            },
            {
              "src": "maskable-icon-512x512.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "maskable"
            }
          ]
        }
      })
      */
    ],
  };
});

