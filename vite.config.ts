import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
          ArcoResolver({
            sideEffect: true
          }),
          name => {
            if (name.startsWith('Icon')) return { name: name.slice(4), from: '@icon-park/vue-next'};
          }
        ]
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
})
