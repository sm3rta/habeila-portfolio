import { Box, Container, ContainerProps } from '@hope-ui/solid';
import { HEADER_HEIGHT } from '../../ui/theme';
import { styled } from 'solid-styled-components';
import { Show } from 'solid-js';

const BubbleSvg = (props: any) => (
	<div {...props}>
		<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
			<path
				d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
				class="shape-fill"
			></path>
		</svg>
	</div>
);

const commonStyles = `
	position: absolute;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;

	& svg {
		position: relative;
		display: block;
		width: calc(100% + 1.3px);
		height: 150px;
		transform: rotateY(180deg);
	}

	& .shape-fill {
		fill: rgb(0 0 0 / 40%);
	}
`;

const UpperBubble = styled(BubbleSvg)`
	top: 0;

	${commonStyles}
`;

const BottomBubble = styled(BubbleSvg)`
	bottom: 0;
	transform: rotate(180deg);

	${commonStyles}
`;

const Section = ({
	bottomBubble,
	upperBubble,
	...props
}: ContainerProps & { upperBubble?: boolean; bottomBubble?: boolean }) => (
	<Box position="relative">
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
		<Show when={upperBubble}>
			<UpperBubble />
		</Show>
		<Show when={bottomBubble}>
			<BottomBubble />
		</Show>
	</Box>
);

export default Section;
