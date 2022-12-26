import { HopeThemeConfig } from '@hope-ui/solid/dist/hope-provider';
import './fonts/fonts.scss';

export const theme: HopeThemeConfig = {
	initialColorMode: 'system',
	components: {
		Text: {
			baseStyle: {
				color: 'white',
				fontFamily: 'rubik',
			},
		},
	},
};
