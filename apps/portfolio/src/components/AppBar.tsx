import { Box, Flex, List } from '@hope-ui/solid';
import { useLocation, useResolvedPath } from '@solidjs/router';
import debounce from 'lodash.debounce';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { darkMode } from '../App';
import { Link } from '../ui/components/Link';
import { colors, headerHeight, zIndexes } from '../ui/theme';

type HomeSection = 'home' | 'about' | 'work' | 'contact';

export const AppBar = () => {
	const location = useLocation();
	const pathname = useResolvedPath(() => location.pathname);

	const [visibleElement, setVisibleElement] = createSignal<HomeSection | undefined>('home');
	const sections: Array<HomeSection> = ['home', 'work', 'about', 'contact'];

	const createScrollHandler = (section: HomeSection) => () => {
		const element = document.getElementById(section);
		if (!element) return;
		const bodyRect = document.body.getBoundingClientRect(),
			elemRect = element.getBoundingClientRect(),
			offset = elemRect.top - bodyRect.top;
		window.scrollTo({ top: offset - headerHeight(), behavior: 'smooth' });
	};

	const onScroll = debounce(() => {
		const home = document.getElementById('home')?.getBoundingClientRect().top ?? 0;
		const work = document.getElementById('work')?.getBoundingClientRect().top ?? 0;
		const about = document.getElementById('about')?.getBoundingClientRect().top ?? 0;
		const contact = document.getElementById('contact')?.getBoundingClientRect().top ?? 0;
		const i = [home, work, about, contact].map((v) => v + document.body.offsetHeight / 2).findIndex((v) => v > 0);
		if (i === -1) setVisibleElement(undefined);
		else setVisibleElement(sections[i]);
	}, 10);

	onMount(() => {
		window.addEventListener('scroll', onScroll);
	});
	onCleanup(() => {
		window.removeEventListener('scroll', onScroll);
	});

	return (
		<Flex
			position="fixed"
			h={headerHeight()}
			backgroundColor={darkMode() ? colors.secondary1 : colors.secondary7}
			top={0}
			w="100%"
			justifyContent="center"
			alignItems="center"
			zIndex={zIndexes.appBar}
		>
			<List d="flex" columnGap="$3" alignItems="baseline">
				<Link
					role="listitem"
					// href="/#home"
					href="/"
					onClick={createScrollHandler('home')}
					active={pathname() === '/' && visibleElement() === 'home'}
				>
					Home
				</Link>
				<Box
					columnGap="$4"
					maxW={pathname() === '/' ? '200px' : '0px'}
					mx={pathname() === '/' ? '0' : '-$1_5'}
					transition="all 0.5s ease-in-out"
					display="flex"
					overflowX="hidden"
					p={pathname() === '/' ? '$1' : '0'}
				>
					<Link
						small
						role="listitem"
						// href="/#work"
						href="/"
						onClick={createScrollHandler('work')}
						active={visibleElement() === 'work'}
						tabIndex={pathname() === '/' ? 0 : -1}
					>
						Work
					</Link>
					<Link
						small
						role="listitem"
						// href="/#about"
						href="/"
						onClick={createScrollHandler('about')}
						active={visibleElement() === 'about'}
						tabIndex={pathname() === '/' ? 0 : -1}
					>
						About
					</Link>
					<Link
						small
						role="listitem"
						// href="/#contact"
						href="/"
						onClick={createScrollHandler('contact')}
						active={visibleElement() === 'contact'}
						tabIndex={pathname() === '/' ? 0 : -1}
					>
						Contact
					</Link>
				</Box>
				<Link role="listitem" href="/resume" active={pathname() === '/resume'}>
					Resume
				</Link>
			</List>
		</Flex>
	);
};
