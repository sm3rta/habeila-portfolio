import { PropsOf } from '@hope-ui/solid';
import { styled } from 'solid-styled-components';
import StyledDivider from '../../ui/components/Divider';

export const ResumeDivider = styled((props: PropsOf<typeof StyledDivider> & { noMargin?: boolean }) => (
	<StyledDivider {...props} />
))(({ noMargin }) => ({
	marginBlock: noMargin ? 0 : '0.5rem',
	backgroundColor: 'gray',
}));
