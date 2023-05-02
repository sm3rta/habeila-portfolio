import { Flex, HopeProvider } from '@hope-ui/solid';
import { Navigate, Outlet, Route, Router, Routes } from '@solidjs/router';
import { Suspense, createSignal, lazy } from 'solid-js';
import { AppBar } from './components/AppBar';
import { Footer } from './components/Footer';
import { Stars } from './components/Stars';
import { DarkModeSwitch } from './ui/components/DarkModeSwitch';
import Loader from './ui/components/Loader';
import { colors, darkTheme, headerHeight, lightTheme } from './ui/theme';

const Home = lazy(() => import('./pages/home'));
const Project = lazy(() => import('./pages/projects'));
const Resume = lazy(() => import('./pages/resume'));
const ResumeRaw = lazy(() => import('./pages/resume-raw'));
const CoverLetter = lazy(() => import('./pages/cover-letter'));

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
			pt={headerHeight()}
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
				<Route path="/cover" component={CoverLetter} />
				<Route path="*" element={<Navigate href="/" />} />
			</Routes>
		</Router>
	);
};

export default App;
