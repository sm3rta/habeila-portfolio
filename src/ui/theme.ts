import { HopeThemeConfig } from '@hope-ui/solid/dist/hope-provider';

export const HEADER_HEIGHT = 60;
export const ICON_SIZE = 30;
export const TILE_SIZE = 140;
export const zIndexes = {
	// above buttons, which are above stars
	appBar: 100,
	// above stars, e.g. buttons
	aboveStar: 2,
	// star and what's on the same level
	star: 1,
};

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

	secondary1: '#030c0e',
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

export const theme = {
	initialColorMode: 'dark',

	darkTheme: {
		colors,
		fontSizes: {
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
			xs: '0.75rem',
		},
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
					color: colors.secondary3,
				},
				_active: {
					color: colors.secondary2,
				},
			},
		},
		Badge: {
			baseStyle: {
				// color: colors.primary5,
				// backgroundColor: colors.secondary1,
				color: colors.secondary1,
				backgroundColor: colors.primary7,
				textTransform: 'none',
			},
		},
		Button: {
			baseStyle: {
				root: {
					zIndex: zIndexes.aboveStar,
				},
			},
		},
	},
} as const satisfies HopeThemeConfig;
