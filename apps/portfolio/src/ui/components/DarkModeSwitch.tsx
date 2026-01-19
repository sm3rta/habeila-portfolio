import { Box, Switch } from '@hope-ui/solid';
import { BsMoonStarsFill } from 'solid-icons/bs';
import { IoSunny } from 'solid-icons/io';
import { darkMode, setDarkMode } from '../../App';

export const DarkModeSwitch = () => {
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
