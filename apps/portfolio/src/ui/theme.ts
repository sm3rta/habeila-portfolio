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

export const darkThemeColors = {
	primary1: '#1A1515',
	primary2: '#1F1A1A',
	primary3: '#241E1E',
	primary4: '#292222',
	primary5: '#2E2727',
	primary6: '#332B2B',
	primary7: '#473D3D',
	primary8: '#5C5050',
	primary9: '#706464',
	primary10: '#857878',
	primary11: '#998D8D',
	primary12: '#ADA2A2',

	accent1: '#051D24',
	accent2: '#062129',
	accent3: '#07252E',
	accent4: '#082A34',
	accent5: '#113B47',
	accent6: '#1D4D5C',
	accent7: '#2D6170',
	accent8: '#417585',
	accent9: '#588A99',
	accent10: '#72A0AD',
	accent11: '#90B6C2',
	accent12: '#B2CED6',
} as const satisfies NonNullable<HopeThemeConfig['darkTheme']>['colors'];

export const lightThemeColors = {
	primary1: '#EBE7E7',
	primary2: '#D6CFCF',
	primary3: '#C2B8B8',
	primary4: '#ADA2A2',
	primary5: '#998D8D',
	primary6: '#857878',
	primary7: '#706464',
	primary8: '#5C5050',
	primary9: '#473D3D',
	primary10: '#332B2B',
	primary11: '#2E2727',
	primary12: '#292222',

	accent1: '#D7E6EB',
	accent2: '#B2CED6',
	accent3: '#90B6C2',
	accent4: '#72A0AD',
	accent5: '#588A99',
	accent6: '#417585',
	accent7: '#2D6170',
	accent8: '#1D4D5C',
	accent9: '#113B47',
	accent10: '#082A34',
	accent11: '#07252E',
	accent12: '#062129',
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
				_active: {
					color: '$primary1',
					background: 'unset',
				},
				_disabled: {
					'&:hover': {
						background: 'unset',
					},
					background: 'unset',
				},
			},
		},
		Badge: {
			baseStyle: {
				// color: "$primary5",
				// backgroundColor: "$accent1",
				color: lightThemeColors.accent12,
				backgroundColor: lightThemeColors.primary1,
				textTransform: 'none',
				borderRadius: 0,
				zIndex: zIndexes.aboveRhombus,
			},
		},
		Button: {
			baseStyle: {
				root: {
					zIndex: zIndexes.aboveRhombus,
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
				color: lightThemeColors.primary1,
				backgroundColor: darkThemeColors.accent1,
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
