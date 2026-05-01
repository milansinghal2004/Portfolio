import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore - process is a Node global
  base: process.env.GITHUB_ACTIONS ? '/Portfolio/' : '/',
  plugins: [react(), tsconfigPaths()],
})
