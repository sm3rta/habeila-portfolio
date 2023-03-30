import { Box, Container, ContainerProps } from '@hope-ui/solid';
import { Show } from 'solid-js';
import { HEADER_HEIGHT } from '../../ui/theme';
import { BottomSectionDivider, UpperSectionDivider } from './SectionDivider';

const Section = ({
	bottomSectionDivider,
	upperSectionDivider,
	...props
}: ContainerProps & { upperSectionDivider?: boolean; bottomSectionDivider?: boolean }) => (
	<Box position="relative">
		<Container
			minH={`calc(100vh - ${HEADER_HEIGHT}px)`}
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
		<Show when={upperSectionDivider}>
			<UpperSectionDivider />
		</Show>
		<Show when={bottomSectionDivider}>
			<BottomSectionDivider />
		</Show>
	</Box>
);

export default Section;
