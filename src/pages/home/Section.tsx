import { Box, Container, ContainerProps } from '@hope-ui/solid';
import { HEADER_HEIGHT } from '../../ui/theme';

const Section = (props: ContainerProps) => (
	<Box>
		<Container
			height={`calc(100vh - ${HEADER_HEIGHT}px)`}
			d="flex"
			placeContent="center"
			alignContent="center"
			flexDirection="column"
			w="fit-content"
			css={{
				p: '2rem',
				'@lg': { px: '4rem', py: '8rem' },
				...props.css,
			}}
			{...props}
		/>
	</Box>
);

export default Section;
