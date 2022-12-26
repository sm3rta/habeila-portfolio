import { createTheme } from '@suid/material';
import './fonts/fonts.scss';

export const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: 'rgba(255, 255, 255)',
		},
		text: {
			// primary: "rgb(255, 255, 255)",
		},
	},
	typography: {
		allVariants: {
			color: 'white',
			fontFamily: 'rubik',
		},
	},
});
