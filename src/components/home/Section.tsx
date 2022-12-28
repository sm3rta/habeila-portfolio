import { Container, ContainerProps } from '@hope-ui/solid';

const Section = (props: ContainerProps) => (
	<Container
		css={{
			p: '2rem',
			'@lg': { px: '4rem', py: '8rem' },
			...props.css,
		}}
		{...props}
	/>
);

export default Section;
