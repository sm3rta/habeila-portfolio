import { Box } from '@hope-ui/solid';
import { JSX } from 'solid-js';
import { styled } from 'solid-styled-components';
import { getAsteriskSectionColor } from '../../ui/theme';

const sectionDividerPaths = [
	'M 321 56 L 493 14 L 743 14 L 985 92 L 1200 95 V 0 H 0 V 27 L 154 49 Z',
	'M 321 56 L 493 0 L 743 0 L 985 92 L 1200 95 V 0 H 0 V 27 L 143 56 Z',
	'M 321 56 L 493 0 L 743 0 L 985 92 L 1200 0 V 0 H 0 V 27 L 143 56 Z',
	'M 250 70 L 500 0 L 966 100 L 1200 0 V 0 H 0 V 27 Z',
];

const getRandomDividerPath = () => sectionDividerPaths[Math.floor(Math.random() * sectionDividerPaths.length)];

const SectionDividerSvg = (props: JSX.IntrinsicElements['div']) => (
	<div {...props}>
		<svg
			role="presentation"
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
		>
			<path class="shape-fill" d={getRandomDividerPath()} />
		</svg>
	</div>
);

export const sectionDividerHeight = 150;

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
		height: ${sectionDividerHeight}px;
		transform: rotateY(180deg);
	}
`;

export const UpperSectionDividerSvg = styled(SectionDividerSvg)`
	top: 0;
	${commonStyles}
`;
export const BottomSectionDividerSvg = styled(SectionDividerSvg)`
	bottom: 0;
	transform: rotate(180deg);
	${commonStyles}
`;

const sectionDividerWrapperCss = () => ({
	'& .shape-fill': { fill: getAsteriskSectionColor() },
});

export const UpperSectionDivider = () => (
	<Box css={sectionDividerWrapperCss()} data-id="SectionDivider-box-1-0462fb">
		<UpperSectionDividerSvg />
	</Box>
);

export const BottomSectionDivider = () => (
	<Box css={sectionDividerWrapperCss()} data-id="SectionDivider-box-2-26cf4b">
		<BottomSectionDividerSvg />
	</Box>
);
