import { Box, Container, ContainerProps } from '@hope-ui/solid';
import { Show, splitProps } from 'solid-js';
import { headerHeight } from '../../ui/theme';
import { BottomSectionDivider, UpperSectionDivider } from './SectionDivider';

const Section = (_props: ContainerProps & { upperSectionDivider?: boolean; bottomSectionDivider?: boolean }) => {
	const [dividers, props] = splitProps(_props, ['bottomSectionDivider', 'upperSectionDivider']);
	return (
		<Box position="relative">
			<Container
				minH={`calc(100vh - ${headerHeight()}px)`}
				d="flex"
				placeContent="center"
				alignContent="center"
				flexDirection="column"
				w="fit-content"
				p={{
					'@initial': '120px $6',
					'@xl': '60px $16',
				}}
				{...props}
			/>
			<Show when={dividers.upperSectionDivider}>
				<UpperSectionDivider />
			</Show>
			<Show when={dividers.bottomSectionDivider}>
				<BottomSectionDivider />
			</Show>
		</Box>
	);
};
export default Section;
