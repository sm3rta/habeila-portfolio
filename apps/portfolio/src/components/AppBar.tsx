import { Box, Flex, List } from '@hope-ui/solid';
import { useLocation, useResolvedPath } from '@solidjs/router';
import debounce from 'lodash.debounce';
import { Show, createSignal, onCleanup, onMount } from 'solid-js';
import { DarkModeSwitch } from '../ui/components/DarkModeSwitch';
import { Link } from '../ui/components/Link';
import { zIndexes } from '../ui/theme';
import { createMediaQuery } from '@solid-primitives/media';

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
		window.scrollTo({ top: offset, behavior: 'smooth' });
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

	const isSmall = createMediaQuery('(max-width: 960px)');

	return (
		<Flex
			as="nav"
			position={isSmall() ? 'unset' : 'fixed'}
			top={0}
			right={0}
			mr="$4"
			mt="$2"
			direction="column"
			zIndex={zIndexes.appBar}
			pointerEvents="none"
		>
			<List d="flex" flexDirection="column" columnGap="$3" alignItems="flex-end" pointerEvents="none">
				<Link
					role="listitem"
					href="/"
					onClick={createScrollHandler('home')}
					active={pathname() === '/' && visibleElement() === 'home'}
				>
					Home
				</Link>

				<Show when={!isSmall()}>
					<Box
						columnGap="$4"
						maxH={pathname() === '/' ? '200px' : '0px'}
						transition="all 0.5s ease-in-out"
						display="flex"
						overflowY="hidden"
						p={pathname() === '/' ? '$1' : '0'}
						d="flex"
						flexDirection="column"
						alignItems="flex-end"
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
				</Show>

				<Link role="listitem" href="/resume" active={pathname() === '/resume'}>
					Resume
				</Link>
			</List>
			<DarkModeSwitch />
		</Flex>
	);
};
