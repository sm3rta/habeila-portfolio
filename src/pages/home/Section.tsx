import { Box, Container, ContainerProps } from '@hope-ui/solid';
import { HEADER_HEIGHT } from '../../ui/theme';
import { styled } from 'solid-styled-components';
import { Show } from 'solid-js';

const sectionDividerPaths = [
	'M 321 56 L 493 14 L 743 14 L 985 92 L 1200 95 V 0 H 0 V 27 L 154 49 Z',
	'M 321 56 L 493 0 L 743 0 L 985 92 L 1200 95 V 0 H 0 V 27 L 143 56 Z',
	'M 321 56 L 493 0 L 743 0 L 985 92 L 1200 0 V 0 H 0 V 27 L 143 56 Z',
	'M 250 70 L 500 0 L 966 100 L 1200 0 V 0 H 0 V 27 Z',
];

const getRandomDividerPath = () => sectionDividerPaths[Math.floor(Math.random() * sectionDividerPaths.length)];

const SectionDividerSvg = (props: any) => (
	<div {...props}>
		<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
			<path class="shape-fill" d={getRandomDividerPath()} />
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

export const UpperSectionDivider = styled(SectionDividerSvg)`
	top: 0;
	${commonStyles}
`;

export const BottomSectionDivider = styled(SectionDividerSvg)`
	bottom: 0;
	transform: rotate(180deg);
	${commonStyles}
`;

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
				'@lg': '120px $8',
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
