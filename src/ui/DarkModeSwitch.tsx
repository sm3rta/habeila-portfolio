import { Box, Switch } from '@hope-ui/solid';
import { darkMode, setDarkMode } from '../App';
import { IoSunny } from 'solid-icons/io';
import { BsMoonStarsFill } from 'solid-icons/bs';
import { getAsteriskSectionColor } from './theme';
import { createSignal, onMount, onCleanup } from 'solid-js';

export const DarkModeSwitch = () => {
	const [scrolledToEnd, setScrolledToEnd] = createSignal(false);
	const updateScrolledToEnd = () =>
		setScrolledToEnd(window.innerHeight + window.scrollY >= document.body.scrollHeight - 10);
	onMount(() => {
		window.onscroll = updateScrolledToEnd;
	});
	onCleanup(() => {
		window.onscroll = null;
	});

	return (
		<Box
			position="fixed"
			bottom={0}
			right={0}
			d="flex"
			alignItems="center"
			gap="$4"
			px="$4"
			height={40}
			zIndex={5}
			// boxShadow={`${getAsteriskSectionColor()} 0 0 11px 20px`}
			background={scrolledToEnd() ? 'transparent' : getAsteriskSectionColor()}
			transition="all 0.3s ease-in-out"
		>
			<IoSunny />
			<Switch
				defaultChecked={darkMode()}
				onChange={(e) => {
					const newValue = (e.target as unknown as { checked: boolean }).checked;
					setDarkMode(newValue);
					localStorage.setItem('darkMode', newValue ? 'true' : 'false');
				}}
				colorScheme="neutral"
				{...{ 'aria-label': 'Dark mode switch' }}
				css={{
					'&>.hope-switch__label': {
						display: 'none',
					},
				}}
			/>
			<BsMoonStarsFill />
		</Box>
	);
};
