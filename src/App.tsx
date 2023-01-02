import { Box, HopeProvider } from '@hope-ui/solid';
import { Route, Router, Routes } from '@solidjs/router';
import { AppBar } from './components/AppBar';
import { Footer } from './components/Footer';
import { Stars } from './components/Stars';
import { HEADER_HEIGHT, colors, theme } from './ui/theme';
import { lazy } from 'solid-js';
import Project from './pages/projects';
import { Resume } from './pages/resume';

const Home = lazy(() => import('./pages/home'));

const App = () => {
	return (
		<Router>
			<HopeProvider config={theme}>
				<Box
					as="main"
					w="100%"
					pt={HEADER_HEIGHT}
					d="flex"
					flexDirection="column"
					position="relative"
					overflow="hidden"
					background={`linear-gradient(${colors.secondary1}, ${colors.primary1})`}
					minHeight="100%"
				>
					<Box position="fixed" top={90} left={0} id="fab" background="white" color="black"></Box>
					<Stars />
					<AppBar />

					<Routes>
						<Route path="/" component={Home} />
						<Route path="/projects/:id" component={Project} />
						<Route path="/resume" element={Resume} />
					</Routes>

					<Footer />
				</Box>
			</HopeProvider>
		</Router>
	);
};

export default App;
