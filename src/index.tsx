import { render } from 'solid-js/web';
import App from './App';
import './global.scss';
import { theme } from './ui/theme';
import { HopeProvider } from '@hope-ui/solid';

render(
	() => (
		<HopeProvider config={theme}>
			<App />
		</HopeProvider>
	),
	document.getElementById('root') as HTMLElement
);
