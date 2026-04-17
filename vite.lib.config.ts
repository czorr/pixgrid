import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Library build (consumed by npm install).
export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/lib/index.ts'),
			fileName: (format) => `pixgrid.${format === 'es' ? 'js' : 'cjs'}`,
			formats: ['es', 'cjs']
		},
		outDir: 'dist/lib',
		emptyOutDir: false,
		sourcemap: true,
		target: 'es2020',
		minify: 'esbuild',
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			output: {
				exports: 'named',
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM'
				}
			}
		}
	}
});
