import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import eslint from 'vite-plugin-eslint';
import mkcert from 'vite-plugin-mkcert';
import solidPlugin from 'vite-plugin-solid';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import packageJson from './package.json';

const { dependencies } = packageJson;

// these packages have to be bundled in the vendor bundle
// they're needed while the app is booting
const vendorDepsArray: string[] = [];

function renderChunks(deps: Record<string, string>) {
	const chunks: Record<string, Array<string>> = {};
	Object.keys(deps).forEach((key) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (vendorDepsArray.includes(key) || key.startsWith('@types/')) return;
		chunks[key] = [key];
	});
	return chunks;
}

// console.log(renderChunks(dependencies));

export default defineConfig({
	plugins: [
		solidPlugin(),
		mkcert(),
		eslint(),
		// Compress assets with gzip
		viteCompression({
			algorithm: 'gzip',
			ext: '.gz',
		}),
		// Also create brotli compressed versions
		viteCompression({
			algorithm: 'brotliCompress',
			ext: '.br',
		}),
	],
	server: { https: true, port: 3002, host: true },
	resolve: {
		alias: {},
	},
	build: {
		target: 'esnext',
		// Enable minification in production
		minify: 'terser',
		// change v to true to use source-map-analyzer
		sourcemap: false,
		// Optimize CSS
		cssMinify: true,
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
				passes: 2,
				dead_code: true,
				conditionals: true,
				evaluate: true,
				booleans: true,
				loops: true,
				unused: true,
				toplevel: true,
				if_return: true,
				join_vars: true,
				reduce_vars: true,
			},
			format: {
				comments: false,
			},
			mangle: {
				safari10: true,
			},
		},
		// Increase chunk size warning limit (after compression)
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				experimentalMinChunkSize: 5000,
				manualChunks: (id) => {
					// Split solid-icons into separate chunks per icon set
					if (id.includes('solid-icons/')) {
						const parts = id.split('solid-icons/');
						if (parts[1]) {
							const iconSet = parts[1].split('/')[0];
							return `icons-${iconSet}`;
						}
					}

					if (id.includes('solid-icons')) {
						return 'icons-common';
					}
					// Split @hope-ui into its own chunk
					if (id.includes('@hope-ui')) {
						return 'hope-ui';
					}
					// Split solidjs router
					if (id.includes('@solidjs/router')) {
						return 'solidjs-router';
					}
					// Split node_modules into vendor chunks
					if (id.includes('node_modules')) {
						if (vendorDepsArray.some((dep) => id.includes(dep))) {
							return 'vendor';
						}
						return 'vendor-libs';
					}
				},
			},
		},
	},
});
