import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue()],
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
                             @import "@/assets/styles/commons.scss";`,
         },
      },
   },
   base: '/',
});
