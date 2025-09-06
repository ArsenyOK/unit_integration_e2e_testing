import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  plugins: [
    istanbul({
      requireEnv: true,
      extension: ['.ts', '.js'],
      include: ['src'],
      exclude: ['**/*.spec.ts','**/*.int.spec.ts','**/*.e2e.*','src/main.ts']
    })
  ],
  build: { sourcemap: true }
});
