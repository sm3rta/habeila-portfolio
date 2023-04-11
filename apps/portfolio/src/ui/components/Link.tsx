import { Button } from '@hope-ui/solid';
import { A } from '@solidjs/router';
import { ComponentProps } from 'solid-js';
import { styled } from 'solid-styled-components';
import { darkMode } from '../../App';
import { colors, darkTheme as theme } from '../theme';

export const Link = styled((props: ComponentProps<typeof Button> & { active?: boolean; small?: boolean }) => (
	<Link title={props.children} role="navigation" size="sm" variant="ghost" as={A} {...props} />
))(({ active, small }) => ({
	// backgroundColor: 'unset !important',
	height: '30px',
	// margin: '2px',
	// padding: '2px',
	alignItems: 'center',
	display: 'flex',
	transition: 'all 0.2s ease-in-out',
	'&:hover': {
		color: colors.secondary3,
	},
	'&:active': {
		color: colors.secondary2,
	},
	backgroundSize: '0% 2px',
	backgroundRepeat: 'no-repeat',
	backgroundImage: darkMode() ? 'linear-gradient(white, white)' : 'linear-gradient(black, black)',
	backgroundPosition: 'bottom left',
	...(active && {
		backgroundSize: '100% 2px',
	}),

	fontSize: theme.darkTheme.fontSizes.lg,
	...(small && {
		fontSize: theme.darkTheme.fontSizes.sm,
		// backgroundPosition: 'bottom 1px left',
	}),
}));
