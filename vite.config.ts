import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import mkcert from 'vite-plugin-mkcert';
import suidPlugin from '@suid/vite-plugin';

export default defineConfig({
	plugins: [solidPlugin(), mkcert(), suidPlugin()],
	server: { https: true, port: 3002, host: true },
	build: {
		target: 'esnext',
		outDir: 'build',
		// change v to true to use source-map-analyzer
		sourcemap: false,
	},
});
