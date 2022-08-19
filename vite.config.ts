import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));


// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      'src' : path.resolve(__dirname, './src')
    },
  },
  plugins: [react()]
})
