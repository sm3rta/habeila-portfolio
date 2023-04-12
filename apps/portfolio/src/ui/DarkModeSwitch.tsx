import { Box, Switch } from '@hope-ui/solid';
import { BsMoonStarsFill } from 'solid-icons/bs';
import { IoSunny } from 'solid-icons/io';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { darkMode, setDarkMode } from '../App';
import { getAsteriskSectionColor } from './theme';

export const DarkModeSwitch = () => {
	const [scrolledToEnd, setScrolledToEnd] = createSignal(false);
	const updateScrolledToEnd = () =>
		setScrolledToEnd(window.innerHeight + window.scrollY >= document.body.scrollHeight - 20);
	onMount(() => {
		window.addEventListener('scroll', updateScrolledToEnd);
		updateScrolledToEnd();
	});
	onCleanup(() => {
		window.removeEventListener('scroll', updateScrolledToEnd);
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
