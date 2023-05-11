import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/yys-tool/' : '/',
    server: {
      host: '0.0.0.0',
      port: 8888,
    },
    resolve: {
      alias: {
        '@': '/src/',
      },
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/assets/css/flex-custom.scss';@import '@/assets/css/border-box.scss';`,
        },
      },
    },
    plugins: [vue(), eslintPlugin()],
    build: {
      reportCompressedSize: false,
    },
  }
})
