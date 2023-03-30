export const randRange = (_a: number, _b = 0) => {
	const [a, b] = [_a, _b].sort((a, b) => a - b).reverse();
	return Math.random() * (b - a) + a;
};
export const randRangeInt = (_a: number, _b = 0) => {
	const [a, b] = [_a, _b].sort((a, b) => a - b).reverse();
	return Math.floor(Math.random() * (b - a)) + a;
};

export const generateRandomColor = (alpha = 1) =>
	`hsla(${randRangeInt(0, 359)}deg ${randRangeInt(20, 40)}% ${randRangeInt(20, 40)}% / ${alpha})`;
export const generateRandomColorLight = (alpha = 1) =>
	`hsla(${randRangeInt(0, 359)}deg ${randRangeInt(60, 80)}% ${randRangeInt(20, 50)}% / ${alpha})`;
// export const generateRandomColor = (alpha = 1) =>
// 	`hsla(${randRangeInt(191, 360)}deg ${randRangeInt(20, 40)}% ${randRangeInt(10, 40)}% / ${alpha})`;

export * from './getTitle';
export * from './printWidth';
