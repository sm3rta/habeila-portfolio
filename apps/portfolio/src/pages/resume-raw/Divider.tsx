import { Divider, PropsOf } from '@hope-ui/solid';
import { styled } from 'solid-styled-components';

export const StyledDivider = styled((props: PropsOf<typeof Divider> & { noMargin?: boolean }) => (
	<Divider {...props} />
))(({ noMargin }) => ({
	marginBlock: noMargin ? 0 : '0.5rem',
	backgroundColor: 'gray',
	// height: '2px',
}));
