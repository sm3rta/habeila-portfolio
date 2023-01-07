import { Box, Container, ContainerProps } from '@hope-ui/solid';
import { HEADER_HEIGHT } from '../../ui/theme';

const Section = (props: ContainerProps) => (
	<Box>
		<Container
			minH={`calc(100vh - ${HEADER_HEIGHT}px)`}
			d="flex"
			placeContent="center"
			alignContent="center"
			flexDirection="column"
			w="fit-content"
			p={{
				'@initial': '$6',
				'@lg': '$4 $8',
			}}
			{...props}
		/>
	</Box>
);

export default Section;
