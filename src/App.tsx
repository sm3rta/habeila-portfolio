import { Box, HopeProvider } from '@hope-ui/solid';
import { Route, Router, Routes } from '@solidjs/router';
import { AppBar } from './components/AppBar';
import { Footer } from './components/Footer';
import { Stars } from './components/Stars';
import { HEADER_HEIGHT, colors, theme } from './ui/theme';
import { lazy } from 'solid-js';

const Home = lazy(() => import('./components/home'));

const App = () => {
	return (
		<Router>
			<HopeProvider config={theme}>
				<Box
					as="main"
					width="100%"
					pt={HEADER_HEIGHT}
					display="flex"
					flexDirection="column"
					position="relative"
					overflow="hidden"
					background={`linear-gradient(${colors.secondary1}, ${colors.primary1})`}
					minHeight="100%"
				>
					<Stars />
					<AppBar />

					<Routes>
						<Route path="/" component={Home} />
						<Route path="/resume" element={() => null} />
					</Routes>

					<Footer />
				</Box>
			</HopeProvider>
		</Router>
	);
};

export default App;
