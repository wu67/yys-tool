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
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      // 构建后是否生成 source map 文件
      // sourcemap: mode !== 'production',
      // 禁用则将css合并为单文件
      cssCodeSplit: false,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: false,
      // 当前没必要. tree shaking工作得很好.
      // rollupOptions: {
      //   output: {
      //     manualChunks: {
      //       element: ['element-plus'],
      //     },
      //   },
      // },
    },
  }
})
