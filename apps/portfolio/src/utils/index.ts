import { darkMode } from '../App';
import { accentColors, darkThemeColors, lightThemeColors, primaryColors } from '../ui/theme';

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

export const generateRandomColorBackgroundRhombus = () => {
	const randomColors = darkMode()
		? [...Object.values(primaryColors).slice(1, 9), ...Object.values(accentColors).slice(1, 7)]
		: [...Object.values(primaryColors).slice(6, 15), ...Object.values(accentColors).slice(6, 15)];

	return randomFromArray(randomColors);
};

export const generateRandomColorHeaderFooterRhombus = () => {
	const randomColors = darkMode() ? [...Object.values(lightThemeColors)] : [...Object.values(darkThemeColors)];
	return randomFromArray(randomColors);
};

export const clamp = (min: number, value: number, max: number) => Math.min(Math.max(value, min), max);

export const applyAlphaToHex = (hex: string, alpha: number) => {
	const clampedAlpha = clamp(0, alpha, 1);
	const alphaHex = Math.round(clampedAlpha * 255)
		.toString(16)
		.padStart(2, '0');
	return `${hex}${alphaHex}`;
};

export * from './getTitle';
