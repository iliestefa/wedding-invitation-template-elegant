import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
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