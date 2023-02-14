import { Box, Flex, HopeProvider, Switch } from '@hope-ui/solid';
import { Navigate, Outlet, Route, Router, Routes } from '@solidjs/router';
import { JSX, Suspense, createSignal, lazy } from 'solid-js';
import { AppBar } from './components/AppBar';
import { Footer } from './components/Footer';
import { Stars } from './components/Stars';
import Loader from './ui/components/Loader';
import { HEADER_HEIGHT, colors, darkTheme, lightTheme } from './ui/theme';
import { DarkModeSwitch } from './ui/DarkModeSwitch';

const Home = lazy(() => import('./pages/home'));
const Project = lazy(() => import('./pages/projects'));
const Resume = lazy(() => import('./pages/resume'));
const ResumeRaw = lazy(() => import('./pages/resume-raw'));

export const [darkMode, setDarkMode] = createSignal(
	localStorage.getItem('darkMode')
		? localStorage.getItem('darkMode') === 'true'
		: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
	// true
);

const App = () => {
	const layout = () => (
		<Flex
			as="main"
			w="100%"
			pt={HEADER_HEIGHT}
			direction="column"
			position="relative"
			overflow="hidden"
			background={
				darkMode()
					? `linear-gradient(${colors.secondary1}, ${colors.primary1})`
					: `linear-gradient(${colors.secondary9}, ${colors.primary3})`
			}
			minHeight="100%"
		>
			<Stars />
			<DarkModeSwitch />
			<AppBar />
			<Suspense fallback={<Loader />}>
				<Outlet />
			</Suspense>
			<Footer />
		</Flex>
	);

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						darkMode() ? (
							<HopeProvider config={darkTheme}>{layout()}</HopeProvider>
						) : (
							<HopeProvider config={lightTheme}>{layout()}</HopeProvider>
						)
					}
				>
					<Route path="/" component={Home} />
					<Route path="/resume" component={Resume} />
					<Route path="/projects/:id" component={Project} />
					<Route path="*" element={<Navigate href="/" />} />
				</Route>

				<Route path="/resume-raw" component={ResumeRaw} />
				<Route path="*" element={<Navigate href="/" />} />
			</Routes>
		</Router>
	);
};

export default App;
