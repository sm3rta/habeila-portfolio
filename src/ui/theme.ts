import { HopeThemeConfig } from '@hope-ui/solid/dist/hope-provider';
import './fonts/fonts.scss';

export const HEADER_HEIGHT = 48;

export const theme = {
	initialColorMode: 'dark',

	darkTheme: {
		colors: {
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

			secondary1: '#0d1011',
			secondary2: '#2e3031',
			secondary3: '#4b4e4f',
			secondary4: '#5e6162',
			secondary5: '#858889',
			secondary6: '#a6a9aa',
			secondary7: '#cbcecf',
			secondary8: '#dee1e2',
			secondary9: '#ebeeef',
			secondary10: '#f4f7f8',
			secondary11: '#ffffff',
			secondary12: '#ffffff',
		},
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
				fontFamily: 'rubik',
			},
		},
		Text: {
			baseStyle: {
				color: 'white',
				fontFamily: 'rubik',
			},
		},
	},
} as const satisfies HopeThemeConfig;
