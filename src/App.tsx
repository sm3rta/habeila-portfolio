import { Box, HopeProvider } from '@hope-ui/solid';
import { Route, Router, Routes } from '@solidjs/router';
import { Suspense, lazy } from 'solid-js';
import { AppBar } from './components/AppBar';
import { Footer } from './components/Footer';
import { Stars } from './components/Stars';
import Loader from './ui/components/Loader';
import { HEADER_HEIGHT, colors, theme } from './ui/theme';

const Home = lazy(() => import('./pages/home'));
const Project = lazy(() => import('./pages/projects'));
const Resume = lazy(() => import('./pages/resume'));

const App = () => (
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
				<Stars />
				<AppBar />

				<Suspense fallback={<Loader />}>
					<Routes>
						<Route path="/" component={Home} />
						<Route path="/projects/:id" component={Project} />
						<Route path="/resume" component={Resume} />
					</Routes>
				</Suspense>

				<Footer />
			</Box>
		</HopeProvider>
	</Router>
);

export default App;
