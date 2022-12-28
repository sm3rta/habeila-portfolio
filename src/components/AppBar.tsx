import { Box, List, ListItem } from '@hope-ui/solid';
import { Link } from '../ui/components/Link';
import { HEADER_HEIGHT, colors, theme } from '../ui/theme';
import { Show, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import { useLocation, useResolvedPath } from '@solidjs/router';

type HomeSection = 'home' | 'about' | 'work' | 'contact';

export const AppBar = () => {
	const location = useLocation();
	const pathname = useResolvedPath(() => location.pathname);

	const [visibleElement, setVisibleElement] = createSignal<HomeSection | undefined>('home');
	const sections: Array<HomeSection> = ['home', 'work', 'about', 'contact'];

	const createScrollHandler = (section: HomeSection) => () => {
		window.scrollTo({ top: (document.getElementById(section)?.offsetTop ?? 0) - HEADER_HEIGHT, behavior: 'smooth' });
	};

	const onScroll = () => {
		const home = document.getElementById('home')?.getBoundingClientRect().top ?? 0;
		const work = document.getElementById('work')?.getBoundingClientRect().top ?? 0;
		const about = document.getElementById('about')?.getBoundingClientRect().top ?? 0;
		const contact = document.getElementById('contact')?.getBoundingClientRect().top ?? 0;
		const i = [home, work, about, contact].findIndex((v) => v > 0);
		console.log(`🚀 ~ onScroll ~ [home, work, about, contact]`, [home, work, about, contact]);
		// [home, work, about, contact]
		if (i === -1) setVisibleElement(undefined);
		else setVisibleElement(sections[i]);
	};

	onMount(() => {
		window.addEventListener('scroll', onScroll);
	});
	onCleanup(() => {
		window.removeEventListener('scroll', onScroll);
	});

	return (
		<Box
			position="fixed"
			height={HEADER_HEIGHT}
			backgroundColor={colors.secondary1}
			top={0}
			width="100%"
			display="flex"
			justifyContent="center"
			alignItems="center"
			zIndex={1}
		>
			<List display="flex" columnGap="$4">
				<Link href="/" onClick={createScrollHandler('home')} active={pathname() === '/' && visibleElement() === 'home'}>
					Home
				</Link>
				<Show when={pathname() === '/'}>
					<Link href="/" onClick={createScrollHandler('work')} active={visibleElement() === 'work'}>
						Work
					</Link>
					<Link href="/" onClick={createScrollHandler('about')} active={visibleElement() === 'about'}>
						About
					</Link>
					<Link href="/" onClick={createScrollHandler('contact')} active={visibleElement() === 'contact'}>
						Contact
					</Link>
				</Show>
				<Link href="/resume" active={pathname() === '/resume'}>
					Resume
				</Link>
			</List>
		</Box>
	);
};
