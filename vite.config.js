import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue(), svgLoader()],
   resolve: {
      alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
   },
   css: {
      preprocessorOptions: {
         scss: {
            additionalData: `@import "@/assets/styles/colors.scss";
                             @import "@/assets/styles/grid.scss";
                             @import "@/assets/styles/fonts.scss";
                             @import "@/assets/styles/commons.scss";
                             @import "@/assets/styles/breakpoints.scss";
                             @import "@/assets/styles/z-indexes.scss";`,
         },
      },
   },
   chainWebpack: (config) => {
      const svgRule = config.module.rule('svg');

      svgRule.uses.clear();

      svgRule
         .use('babel-loader')
         .loader('babel-loader')
         .end()
         .use('vue-svg-loader')
         .loader('vue-svg-loader');
   },
   base: '',
   server: {
      host: true,
      strictPort: true,
      proxy: {
         '/api': {
            target: 'https://dev-api.komtrans.by',
            changeOrigin: true,
         },
      },
   },
});
