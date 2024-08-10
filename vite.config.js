import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',  // Указывает, что пути к ассетам должны быть относительно корня
  plugins: [react()],
  build: {
    outDir: 'build'  // Путь к директории сборки
  }
});