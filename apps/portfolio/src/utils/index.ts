import { darkMode } from '../App';
import { darkThemeColors, lightThemeColors } from '../ui/theme';

export const randRange = (_a: number, _b = 0) => {
	const [a, b] = [_a, _b].sort((a, b) => b - a);
	return Math.random() * (b - a) + a;
};
export const randRangeInt = (_a: number, _b = 0) => {
	const [a, b] = [_a, _b].sort((a, b) => b - a);
	return Math.floor(Math.random() * (b - a)) + a;
};

export const randomFromArray = <T>(array: Array<T>) => {
	return array[randRangeInt(array.length)];
};

const randomColors = [...Object.values(lightThemeColors), ...Object.values(darkThemeColors)];
export const generateRandomColor = () => {
	return randomFromArray(randomColors);
};

export const clamp = (min: number, value: number, max: number) => Math.min(Math.max(value, min), max);

export * from './getTitle';
