/* eslint-env node */

import { join } from 'path'
import { builtinModules } from 'module'
import { createVuePlugin } from 'vite-plugin-vue2'
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import { chrome } from '../../.electron-vendors.cache.json'

const PACKAGE_ROOT = __dirname

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '@/': `${join(PACKAGE_ROOT, 'src')}/`,
    },
  },
  plugins: [
    // Vue 2
    createVuePlugin({ target: 'esnext' }),
    // Vuetify
    Components({
      directives: false,
      resolvers: [VuetifyResolver()],
    }),
  ],
  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
      external: [...builtinModules.flatMap(p => [p, `node:${p}`])],
    },
    emptyOutDir: true,
    brotliSize: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/main";',
      },
    },
  },
}

export default config
