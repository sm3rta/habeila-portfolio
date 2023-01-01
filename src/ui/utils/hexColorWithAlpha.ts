const hexColorRegExp = new RegExp('#[0-9a-fA-F]{3,8}');

const convert6DigitHexToRgba = (hexColor: string, alpha: string | number) =>
	'rgba(' +
	parseInt(hexColor.substring(0, 2), 16) +
	',' +
	parseInt(hexColor.substring(2, 4), 16) +
	',' +
	parseInt(hexColor.substring(4, 6), 16) +
	',' +
	alpha +
	')';

export const hexColorWithAlpha = (hexColorWithHash: string, alpha: string | number) => {
	if (!hexColorWithHash.match(hexColorRegExp)) throw new Error('string is not a hex color');
	const hexColor = hexColorWithHash.slice(1);

	if (hexColor.length === 4 || hexColor.length === 8) throw new Error('color already has alpha');
	if (hexColor.length === 6) return convert6DigitHexToRgba(hexColor, alpha);
	if (hexColor.length === 3)
		return convert6DigitHexToRgba(
			`${hexColor[0]}${hexColor[0]}${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}`,
			alpha
		);

	throw new Error('invalid hex color code');
};
