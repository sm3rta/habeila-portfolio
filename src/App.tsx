import { Box, Flex, HopeProvider, Switch } from '@hope-ui/solid';
import { Outlet, Route, Router, Routes } from '@solidjs/router';
import { Suspense, lazy } from 'solid-js';
import { AppBar } from './components/AppBar';
import { Footer } from './components/Footer';
import { Stars } from './components/Stars';
import Loader from './ui/components/Loader';
import { HEADER_HEIGHT, colors, theme } from './ui/theme';

const Home = lazy(() => import('./pages/home'));
const Project = lazy(() => import('./pages/projects'));
const Resume = lazy(() => import('./pages/resume'));
const ResumeRaw = lazy(() => import('./pages/resume-raw'));

const App = () => (
	<Router>
		<Routes>
			<Route
				path="/"
				element={
					<HopeProvider config={theme}>
						<Flex
							as="main"
							w="100%"
							pt={HEADER_HEIGHT}
							direction="column"
							position="relative"
							overflow="hidden"
							background={`linear-gradient(${colors.secondary1}, ${colors.primary1})`}
							minHeight="100%"
						>
							<Stars />
							<AppBar />
							<Suspense fallback={<Loader />}>
								<Outlet />
							</Suspense>
							<Footer />
						</Flex>
					</HopeProvider>
				}
			>
				<Route path="/" component={Home} />
				<Route path="/resume" component={Resume} />
				<Route path="/projects/:id" component={Project} />
			</Route>

			<Route path="/resume-raw" component={ResumeRaw} />
		</Routes>
	</Router>
);

export default App;
