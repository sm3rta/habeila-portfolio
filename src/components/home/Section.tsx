import { Box, Container, ContainerProps } from '@hope-ui/solid';
import { ComponentProps } from 'solid-js';

const Section = (props: ContainerProps) => {
	return (
		<Container
			css={{
				p: '2rem',
				'@lg': { p: '4rem' },
				...props.css,
			}}
			{...props}
		/>
	);
};

export default Section;
