declare module 'rallax.js' {
	export type RallaxOptions = {
		speed?: number;
		mobilePx?: number;
	};

	export default class Rallax {
		constructor(node: any, options?: RallaxOptions);
	}
}
