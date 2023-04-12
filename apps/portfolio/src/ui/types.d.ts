declare module 'rallax.js' {
	export type RallaxOptions = {
		speed?: number;
		mobilePx?: number;
	};

	export default class Rallax {
		constructor(node: Record<string, unknown>, options?: RallaxOptions);
	}
}
