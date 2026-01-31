import { Button, useTheme } from '@hope-ui/solid';
import { A } from '@solidjs/router';
import { ComponentProps } from 'solid-js';
import { styled } from 'solid-styled-components';
import { darkMode } from '../../App';

export const Link = styled((props: ComponentProps<typeof Button> & { active?: boolean; small?: boolean }) => (
	<Link title={props.children} role="navigation" size="sm" variant="ghost" as={A} {...props} />
))(({ active, small }) => {
	const { colors, fontSizes } = useTheme()();
	return {
		pointerEvents: 'all',
		// backgroundColor: 'unset !important',
		height: '30px',
		// margin: '2px',
		// padding: '2px',
		alignItems: 'center',
		display: 'flex',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			color: colors.accent3.value,
		},
		'&:active': {
			color: colors.accent2.value,
		},
		backgroundSize: '0% 2px',
		backgroundRepeat: 'no-repeat',
		backgroundImage: darkMode() ? 'linear-gradient(white, white)' : 'linear-gradient(black, black)',
		backgroundPosition: 'bottom left',
		...(active && {
			backgroundSize: '100% 2px',
		}),

		fontSize: fontSizes.lg.value,
		...(small && {
			fontSize: fontSizes.sm.value,
			// backgroundPosition: 'bottom 1px left',
		}),
	};
});
