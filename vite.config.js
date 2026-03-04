import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/wedding-invitation-template-elegant/',
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import'],
        additionalData: `@import 'styles/variables'; @import 'styles/mixins';`,
        loadPaths: [path.resolve(__dirname, 'src')],
      },
    },
  },
});
