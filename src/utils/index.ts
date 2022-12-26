export const randRange = (_a: number, _b = 0) => {
	const [a, b] = [_a, _b].sort((a, b) => a - b).reverse();
	return Math.random() * (b - a) + a;
};
export const randRangeInt = (_a: number, _b = 0) => {
	const [a, b] = [_a, _b].sort((a, b) => a - b).reverse();
	return Math.floor(Math.random() * (b - a)) + a;
};

export const generateRandomColor = (alpha = 1) =>
	`hsla(${randRangeInt(0, 255)}deg ${randRangeInt(20, 60)}% ${randRangeInt(20, 80)}% / ${alpha})`;
