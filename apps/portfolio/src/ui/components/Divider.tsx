import { Divider, PropsOf, useTheme } from '@hope-ui/solid';
import { styled } from 'solid-styled-components';

const StyledDivider = styled((props: PropsOf<typeof Divider>) => <Divider role="separator" {...props} />)(() => {
	const colors = useTheme()().colors;
	return {
		color: colors.neutral9.value,
	};
});

export default StyledDivider;
