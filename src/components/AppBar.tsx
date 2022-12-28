import { Box, List, ListItem } from '@hope-ui/solid';
import { Link } from '../ui/components/Link';
import { HEADER_HEIGHT, theme } from '../ui/theme';
import { createSignal, onCleanup, onMount } from 'solid-js';

type HomeSection = 'home' | 'about' | 'work' | 'contact';

export const AppBar = () => {
	const [visibleElement, setVisibleElement] = createSignal<HomeSection | undefined>();
	const sections: Array<HomeSection> = ['home', 'work', 'about', 'contact'];

	const createScrollHandler = (section: HomeSection) => () => {
		window.scrollTo({ top: (document.getElementById(section)?.offsetTop ?? 0) - HEADER_HEIGHT });
	};

	const scrollHandler = () => {
		const home = document.getElementById('home')?.getBoundingClientRect().top ?? 0;
		const work = document.getElementById('work')?.getBoundingClientRect().top ?? 0;
		const about = document.getElementById('about')?.getBoundingClientRect().top ?? 0;
		const contact = document.getElementById('contact')?.getBoundingClientRect().top ?? 0;
		const i = [home, work, about, contact].findIndex((v) => {
			return v > 0;
		});
		setVisibleElement(sections[i]);
	};

	onMount(() => {
		window.addEventListener('scroll', scrollHandler);
	});
	onCleanup(() => {
		window.removeEventListener('scroll', scrollHandler);
	});

	return (
		<Box
			position="fixed"
			height={HEADER_HEIGHT}
			backgroundColor={theme.darkTheme.colors.secondary1}
			top={0}
			width="100%"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<List display="flex" columnGap="$4">
				<Link href="#home" onClick={createScrollHandler('home')} active={visibleElement() === 'home'}>
					<ListItem>Home</ListItem>
				</Link>
				<Link href="#work" onClick={createScrollHandler('work')} active={visibleElement() === 'work'}>
					<ListItem>Work</ListItem>
				</Link>
				<Link href="#about" onClick={createScrollHandler('about')} active={visibleElement() === 'about'}>
					<ListItem>About</ListItem>
				</Link>
				<Link href="#contact" onClick={createScrollHandler('contact')} active={visibleElement() === 'contact'}>
					<ListItem>Contact</ListItem>
				</Link>
			</List>
		</Box>
	);
};
