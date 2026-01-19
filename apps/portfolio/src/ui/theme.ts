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

export const getAsteriskSectionColor = () => (darkMode() ? 'rgb(0 0 0 / 40%)' : 'rgb(255 255 255 / 40%)');

export const colors = {
	primary1: '#332b2b',
	primary2: '#564d4d',
	primary3: '#766d6d',
	primary4: '#8b8281',
	primary5: '#b6acac',
	primary6: '#d4c9c9',
	primary7: '#f5eaea',
	primary8: '#fbf0f0',
	primary9: '#fff5f5',
	primary10: '#fffafa',
	primary11: '#ffffff',
	primary12: '#ffffff',

	secondary1: '#030f11',
	secondary2: '#082a34',
	secondary3: '#1a3f4b',
	secondary4: '#275260',
	secondary5: '#356575',
	secondary6: '#407385',
	secondary7: '#5c8898',
	secondary8: '#769dac',
	secondary9: '#9abac6',
	secondary10: '#bcd7e0',
	secondary11: '#ddf0f9',
	secondary12: '#ffffff',
} as const satisfies NonNullable<HopeThemeConfig['darkTheme']>['colors'];

export const fontSizes = {
	'9xl': '9vw',
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
		colors,
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
					color: colors.primary4,
				},
				_active: {
					color: colors.primary1,
					background: 'unset',
				},
				_disabled:{
					"&:hover": {
						background: 'unset',
					},
					background: 'unset',
				}
			},
		},
		Badge: {
			baseStyle: {
				// color: colors.primary5,
				// backgroundColor: colors.secondary1,
				color: colors.secondary1,
				backgroundColor: colors.primary7,
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
					color: colors.secondary5,
					'& *': {
						color: colors.secondary5,
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
					color: colors.secondary6,
				},
			},
		},
		Badge: {
			baseStyle: {
				color: colors.primary7,
				backgroundColor: colors.secondary1,
			},
		},
		Button: {
			baseStyle: {
				root: {
					color: 'black',
					_hover: {
						background: colors.secondary8,
					},
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
