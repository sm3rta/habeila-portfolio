import { HopeThemeConfig } from '@hope-ui/solid/dist/hope-provider';
import merge from 'lodash.merge';
import { darkMode } from '../App';

export const ICON_SIZE = 30;
export const TILE_SIZE = 160;
export const zIndexes = {
	// above buttons, which are above rhombi
	appBar: 100,
	// above rhombi, e.g. buttons
	aboveRhombus: 2,
	// background rhombus and what's on the same level
	rhombus: 1,
};
export const createOctagonalClipPathWithMargin = (m: number) =>
	`polygon(${m}% 0, ${100 - m}% 0, 100% ${m}%, 100% ${100 - m}%, ${100 - m}% 100%, ${m}% 100%, 0 ${100 - m}%, 0 ${m}%)`;

export const getAsteriskSectionColor = () => (darkMode() ? 'rgb(0 0 0 / 40%)' : 'rgb(255 255 255 / 20%)');

export const accentColors = {
	1: '#D7E6EB',
	2: '#B2CED6',
	3: '#90B6C2',
	4: '#72A0AD',
	5: '#588A99',
	6: '#417585',
	7: '#2D6170',
	8: '#1D4D5C',
	9: '#113B47',
	10: '#082A34',
	11: '#07252E',
	12: '#062129',
	13: '#051D24',
	14: '#05191F',
	15: '#04141A',
	16: '#031014',
	17: '#020C0F',
	18: '#02080A',
	19: '#010405',
};

export const primaryColors = {
	1: '#EBE7E7',
	2: '#D6CFCF',
	3: '#C2B8B8',
	4: '#ADA2A2',
	5: '#998D8D',
	6: '#857878',
	7: '#706464',
	8: '#5C5050',
	9: '#473D3D',
	10: '#332B2B',
	11: '#2E2727',
	12: '#292222',
	13: '#241E1E',
	14: '#1F1A1A',
	15: '#1A1515',
	16: '#141111',
	17: '#0F0D0D',
	18: '#0A0909',
	19: '#050404',
};

export const darkThemeColors = {
	primary1: primaryColors[15],
	primary2: primaryColors[14],
	primary3: primaryColors[13],
	primary4: primaryColors[12],
	primary5: primaryColors[11],
	primary6: primaryColors[10],
	primary7: primaryColors[9],
	primary8: primaryColors[8],
	primary9: primaryColors[7],
	primary10: primaryColors[6],
	primary11: primaryColors[5],
	primary12: primaryColors[4],

	accent1: accentColors[13],
	accent2: accentColors[12],
	accent3: accentColors[11],
	accent4: accentColors[10],
	accent5: accentColors[9],
	accent6: accentColors[8],
	accent7: accentColors[7],
	accent8: accentColors[6],
	accent9: accentColors[5],
	accent10: accentColors[4],
	accent11: accentColors[3],
	accent12: accentColors[2],
} as const satisfies NonNullable<HopeThemeConfig['darkTheme']>['colors'];

export const lightThemeColors = {
	primary1: primaryColors[1],
	primary2: primaryColors[2],
	primary3: primaryColors[3],
	primary4: primaryColors[4],
	primary5: primaryColors[5],
	primary6: primaryColors[6],
	primary7: primaryColors[7],
	primary8: primaryColors[8],
	primary9: primaryColors[9],
	primary10: primaryColors[10],
	primary11: primaryColors[11],
	primary12: primaryColors[12],

	accent1: accentColors[1],
	accent2: accentColors[2],
	accent3: accentColors[3],
	accent4: accentColors[4],
	accent5: accentColors[5],
	accent6: accentColors[6],
	accent7: accentColors[7],
	accent8: accentColors[8],
	accent9: accentColors[9],
	accent10: accentColors[10],
	accent11: accentColors[11],
	accent12: accentColors[12],
} as const satisfies NonNullable<HopeThemeConfig['lightTheme']>['colors'];

export const fontSizes = {
	'9xl': 'clamp(3rem, 9vw, 8rem)',
	'8xl': '8rem',
	'7xl': '7rem',
	'6xl': '6rem',
	'5xl': '5rem',
	'4xl': '4rem',
	'3xl': '3rem',
	'2xl': '2rem',
	xl: '1.5rem',
	lg: '1.25rem',
	md: '1rem',
	sm: '0.875rem',
	// lg: 'calc(0.75em + 1vw)',
	// md: 'calc(0.75em + 0.5vw)',
	// sm: 'calc(0.75em + 0.25vw)',
	xs: '0.75rem',
} as const satisfies NonNullable<HopeThemeConfig['darkTheme']>['fontSizes'];

export const darkTheme = {
	initialColorMode: 'dark',
	darkTheme: {
		colors: darkThemeColors,
		fontSizes,
	},
	components: {
		Heading: {
			baseStyle: {
				// fontFamily: 'Rubik',
				fontSize: '$md',
			},
		},
		Text: {
			baseStyle: {
				color: 'white',
				// fontFamily: 'Rubik',
				fontSize: '$md',
			},
		},
		IconButton: {
			baseStyle: {
				background: 'unset',
				_hover: {
					background: 'unset',
					color: '$primary4',
				},
				// _active: {
				// 	color: '$primary1',
				// 	background: 'unset',
				// },
				// _disabled: {
				// 	'&:hover': {
				// 		background: 'unset',
				// 	},
				// 	background: 'unset',
				// },
			},
		},
		Badge: {
			baseStyle: {
				color: accentColors[12],
				backgroundColor: primaryColors[1],
				textTransform: 'none',
				borderRadius: 0,
				zIndex: zIndexes.aboveRhombus,
			},
		},
		Button: {
			baseStyle: {
				root: {
					zIndex: zIndexes.aboveRhombus,
					'&[class$="variant-outline"]':{
						color: 'white'
					}
				},
			},
		},
		Anchor: {
			baseStyle: {
				textDecoration: 'underline 1px',
				_hover: {
					color: '$accent5',
					'& *': {
						color: '$accent5',
					},
				},
			},
		},
	},
} as const satisfies HopeThemeConfig;

const lightThemeOverrides = {
	initialColorMode: 'light',
	lightTheme: {
		fontSizes,
		colors: lightThemeColors,
	},
	components: {
		Text: {
			baseStyle: {
				color: 'black',
			},
		},
		IconButton: {
			baseStyle: {
				color: 'black',
				_hover: {
					color: '$accent6',
				},
			},
		},
		Badge: {
			baseStyle: {
				color: primaryColors[1],
				backgroundColor: accentColors[13],
			},
		},
		Button: {
			baseStyle: {
				root: {
					color: 'black',
				},
			},
		},
		Input: {
			baseStyle: {
				input: {
					borderColor: '$neutral12',
					_placeholder: {
						color: '$neutral12',
					},
				},
			},
		},
		Textarea: {
			baseStyle: {
				borderColor: '$neutral12',
				_placeholder: {
					color: '$neutral12',
				},
			},
		},
	},
} satisfies HopeThemeConfig;

export const lightTheme = merge({}, darkTheme, lightThemeOverrides) as Override<
	typeof darkTheme,
	typeof lightThemeOverrides
>;

export type Flat<T> = T extends object ? { [K in keyof T]: Flat<T[K]> } : T;

type Override<T1 extends object, T2 extends object> = Flat<
	{
		[K in keyof T1]: K extends keyof T2
			? // T2[K] exists, override T1[K] with T2[K]
				T1[K] extends object
				? // T1[K] is object
					T2[K] extends object
					? // T2[K] is also an object
						Override<T1[K], T2[K]>
					: // T2[K] is not object
						T2[K]
				: // T1[K] is not object
					T2[K]
			: // T2[K] does not exist, keep T1[K]
				T1[K];
	} & Omit<T2, keyof T1>
>;
