import { defineConfig } from 'vite';
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
	plugins: [solidPlugin(), mkcert(), eslint()],
	server: { https: true, port: 3002, host: true },
	resolve: {
		alias: {},
	},
	build: {
		target: 'esnext',
		// change v to true to use source-map-analyzer
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: vendorDepsArray,
					...renderChunks(dependencies),
				},
			},
		},
	},
});
