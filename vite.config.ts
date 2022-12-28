import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import solidPlugin from 'vite-plugin-solid';
// @ts-ignore
import packageJson from './package.json';
const { dependencies } = packageJson;

// these packages have to be bundled in the vendor bundle
// they're needed while the app is booting
const vendorDepsArray: string[] = [];

function renderChunks(deps: Record<string, string>) {
	let chunks: Record<string, Array<string>> = {};
	Object.keys(deps).forEach((key) => {
		// @ts-ignore
		if (vendorDepsArray.includes(key) || key.startsWith('@types/')) return;
		chunks[key] = [key];
	});
	return chunks;
}

console.log(renderChunks(dependencies));

export default defineConfig({
	plugins: [solidPlugin(), mkcert()],
	server: { https: true, port: 3002, host: true },
	build: {
		target: 'esnext',
		outDir: 'build',
		// change v to true to use source-map-analyzer
		sourcemap: false,
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
