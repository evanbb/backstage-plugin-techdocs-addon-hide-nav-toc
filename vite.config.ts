import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    force: true,
  },
  build: {
    rollupOptions: {
      external: (mid) =>
        mid.includes('node_modules') || mid.startsWith('node:'),
    },
    lib: {
      entry: 'src/index',
      formats: ['es'],
      fileName: 'index',
    },
  },
  plugins: [
    {
      name: '',
      enforce: 'pre',
      async resolveId(source, importer, options) {
        const result = await this.resolve(source, importer, {
          ...options,
          skipSelf: true,
        });

        if (result?.id.includes('node_modules')) {
          return {
            id: source,
            external: true,
          };
        }

        return null;
      },
    },
  ],
});
