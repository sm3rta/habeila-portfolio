import { Box, Switch, useTheme } from '@hope-ui/solid';
import { BsMoonStarsFill } from 'solid-icons/bs';
import { IoSunny } from 'solid-icons/io';
import { darkMode, setDarkMode } from '../../App';
import { createSignal, Ref } from 'solid-js';

export const DarkModeSwitch = () => {
	const colors = useTheme()().colors;

	const changeMode = (newValue: boolean) => {
		setDarkMode(newValue);
		localStorage.setItem('darkMode', newValue ? 'true' : 'false');
		requestAnimationFrame(() => {
			document.getElementById('dark-mode-switch')?.focus();
		});
	};

	return (
		<Box
			d="flex"
			alignItems="center"
			alignSelf="flex-end"
			gap="$4"
			height={40}
			zIndex={5}
			transition="all 0.3s ease-in-out"
			pointerEvents="all"
			data-id="DarkModeSwitch-box-1-c8f175"
		>
			<IoSunny role="presentation" />
			<Switch
				id="dark-mode-switch"
				defaultChecked={darkMode()}
				onChange={(e) => {
					const newValue = (e.target as HTMLInputElement).checked;
					changeMode(newValue);
				}}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						const newValue = !darkMode();
						changeMode(newValue);
					}
				}}
				colorScheme="neutral"
				{...{ 'aria-label': 'Dark mode switch' }}
				css={{
					'&>.hope-switch__label': {
						display: 'none',
					},
					'&>.hope-switch__control': {
						boxShadow: `0px 0px 8px 0px ${colors.primary12.value}`,
					},
					'&:focus-within': {
						outline: `2px solid ${colors.accent8.value}`,
						outlineOffset: '4px',
					},
				}}
			/>
			<BsMoonStarsFill role="presentation" />
		</Box>
	);
};
