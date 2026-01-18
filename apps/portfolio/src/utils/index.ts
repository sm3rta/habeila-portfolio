import { colors } from '../ui/theme';

export const randRange = (_a: number, _b = 0) => {
	const [a, b] = [_a, _b].sort((a, b) => b - a);
	return Math.random() * (b - a) + a;
};
export const randRangeInt = (_a: number, _b = 0) => {
	const [a, b] = [_a, _b].sort((a, b) => b - a);
	return Math.floor(Math.random() * (b - a)) + a;
};

export const randomColors = [...Object.values(colors), 'transparent', 'black'];
export const randomFromArray = <T>(array: Array<T>) => {
	return array[randRangeInt(array.length)];
};
export const generateRandomColor = () => randomFromArray(randomColors);

export const clamp = (min: number, value: number, max: number) => Math.min(Math.max(value, min), max);

export * from './getTitle';
