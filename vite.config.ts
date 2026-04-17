import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Demo/landing build.
export default defineConfig({
	plugins: [react()],
	publicDir: 'src/public',
	build: {
		outDir: 'dist/demo',
		emptyOutDir: true
	}
});
