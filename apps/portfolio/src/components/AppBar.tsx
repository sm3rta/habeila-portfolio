import { Box, Flex } from '@hope-ui/solid';
import { createMediaQuery } from '@solid-primitives/media';
import { useLocation, useResolvedPath } from '@solidjs/router';
import debounce from 'lodash.debounce';
import { Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { DarkModeSwitch } from '../ui/components/DarkModeSwitch';
import { Link } from '../ui/components/Link';
import { zIndexes } from '../ui/theme';

type HomeSection = 'home' | 'about' | 'work' | 'contact';

export const AppBar = () => {
	const location = useLocation();
	const pathname = useResolvedPath(() => location.pathname);

	const sections: Array<HomeSection> = ['home', 'work', 'about', 'contact'];
	const [visibleElement, setVisibleElement] = createSignal<HomeSection | undefined>(undefined);
	createEffect(() => {
		onScroll();
	});

	const createScrollHandler = (section: HomeSection) => () => {
		const element = document.getElementById(section);
		if (!element) return;

		const bodyRect = document.body.getBoundingClientRect();
		const elemRect = element.getBoundingClientRect();
		const elemRectCenterOffset = (elemRect.height - document.body.offsetHeight) / 2;
		const offset = elemRect.top - bodyRect.top + elemRectCenterOffset;
		window.scrollTo({ top: offset, behavior: 'smooth' });
		element.focus();
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
			position={isSmall() ? 'unset' : 'fixed'}
			top={0}
			right={0}
			mr="$4"
			mt="$2"
			direction="column"
			zIndex={zIndexes.appBar}
			pointerEvents="none"
			data-id="AppBar-flex-1-3d9910"
		>
			<Flex
				as="nav"
				flexDirection="column"
				columnGap="$3"
				alignItems="flex-end"
				pointerEvents="none"
				data-id="AppBar-list-1-cd4493"
			>
				<Link
					href="/"
					onClick={() => {
						createScrollHandler('home')();
						requestAnimationFrame(() => {
							document.getElementById('home')?.focus();
						});
					}}
					active={pathname() === '/' && visibleElement() === 'home'}
					aria-label="Go to homepage, scroll to top"
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
						data-id="AppBar-box-1-67555b"
					>
						<Link
							small
							href="/"
							onClick={createScrollHandler('work')}
							active={visibleElement() === 'work'}
							tabIndex={pathname() === '/' ? 0 : -1}
							aria-label="Go to Work section"
						>
							Work
						</Link>
						<Link
							small
							href="/"
							onClick={createScrollHandler('about')}
							active={visibleElement() === 'about'}
							tabIndex={pathname() === '/' ? 0 : -1}
							aria-label="Go to About section"
						>
							About
						</Link>
						<Link
							small
							href="/"
							onClick={createScrollHandler('contact')}
							active={visibleElement() === 'contact'}
							tabIndex={pathname() === '/' ? 0 : -1}
							aria-label="Go to Contact section"
						>
							Contact
						</Link>
					</Box>
				</Show>

				<Link
					href="/experience"
					active={pathname() === '/experience'}
					aria-label="Go to Experience page"
					onClick={() => {
						requestAnimationFrame(() => {
							document.getElementById('main-content')?.focus();
						});
					}}
				>
					Experience
				</Link>

				<Link
					href="/updates"
					active={pathname() === '/updates'}
					aria-label="Go to Updates page"
					onClick={() => {
						requestAnimationFrame(() => {
							document.getElementById('main-content')?.focus();
						});
					}}
				>
					Updates
				</Link>
			</Flex>
			<DarkModeSwitch />
		</Flex>
	);
};
