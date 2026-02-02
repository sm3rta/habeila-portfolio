import { Flex, HopeProvider } from '@hope-ui/solid';
import { Navigate, Outlet, Route, Router, Routes } from '@solidjs/router';
import { Show, Suspense, createSignal, lazy } from 'solid-js';
import { AppBar } from './components/AppBar';
import { BackgroundRhombi } from './components/BackgroundRhombi';
import { Footer } from './components/Footer';
import { HeaderRhombi } from './components/HeaderRhombi';
import Loader from './ui/components/Loader';
import { darkTheme, lightTheme } from './ui/theme';

const Home = lazy(() => import('./pages/home'));
const Project = lazy(() => import('./pages/projects'));
const Experience = lazy(() => import('./pages/experience'));
const Updates = lazy(() => import('./pages/updates'));
const Resume = lazy(() => import('./pages/resume'));
const CoverLetter = lazy(() => import('./pages/cover-letter'));
const DesignSystem = lazy(() => import('./pages/ds'));

export const [darkMode, setDarkMode] = createSignal(
	localStorage.getItem('darkMode')
		? localStorage.getItem('darkMode') === 'true'
		: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
);

const App = () => {
	const layout = () => (
		<Flex
			as="main"
			w="100%"
			direction="column"
			position="relative"
			overflow="hidden"
			background="linear-gradient($accent4, $primary4)"
			minHeight="100%"
			data-id="App-flex-1-279f3c"
		>
			<BackgroundRhombi />
			<HeaderRhombi />
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
					<Route path="/experience" component={Experience} />
					<Route path="/updates" component={Updates} />
					<Route path="/projects/:id" component={Project} />
					<Show when={import.meta.env.DEV}>
						<Route path="/ds" component={DesignSystem} />
					</Show>
					<Route path="*" element={<Navigate href="/" />} />
				</Route>

				<Route path="/" element={<HopeProvider config={lightTheme}>{<Outlet />}</HopeProvider>}>
					<Route path="/resume" component={Resume} />
					<Show when={import.meta.env.DEV}>
						<Route path="/cover" component={CoverLetter} />
					</Show>
				</Route>
				<Route path="*" element={<Navigate href="/" />} />
			</Routes>
		</Router>
	);
};

export default App;
