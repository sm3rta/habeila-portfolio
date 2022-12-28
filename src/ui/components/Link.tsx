import { Button } from '@hope-ui/solid';
import { A } from '@solidjs/router';
import { ComponentProps } from 'solid-js';
import { styled } from 'solid-styled-components';
import { theme } from '../theme';

export const Link = styled((props: ComponentProps<typeof Button> & { active?: boolean }) => (
	<Link {...props} size="sm" variant="ghost" as={A} />
))(({ active }) => ({
	backgroundColor: 'unset !important',
	height: '36px',
	alignItems: 'center',
	display: 'flex',
	transition: 'all 0.2s ease-in-out',
	'&:hover': {
		color: theme.darkTheme.colors.secondary5,
	},
	'&:active': {
		color: theme.darkTheme.colors.secondary3,
	},
	...(active && { color: 'red' }),
}));
