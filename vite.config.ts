import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES // この行を追加
    ? 'openai-chat-app' // この行を追加
    : './', // この行を追加
  plugins: [react(), tsconfigPaths()],
});
