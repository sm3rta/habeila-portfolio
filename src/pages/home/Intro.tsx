import { Badge, Box, Flex, Heading, Text } from '@hope-ui/solid';
import { createElementSize } from '@solid-primitives/resize-observer';
import { For, JSX, createEffect, createSignal } from 'solid-js';
import { styled } from 'solid-styled-components';
import { colors } from '../../ui/theme';
import { randRange } from '../../utils';
import Section from './Section';

const offsetAngle = 20 * (Math.PI / 180);
const oneTenthOfDeg = 0.1 * (Math.PI / 180);
const m = (Math.PI - 2 * offsetAngle) / Math.PI;
const StyledSvg = styled('svg')({ position: 'absolute', width: '100%', height: '100%' });
const aToBRatio = 0.4;

const fSections = 3;
const fMax = 1;
const fMin = 0.4;

const skills = [
	'React 18',
	'TypeScript',
	'Node.js',
	'Git',
	'Jira',
	'Material UI',
	'Sass',
	'JSS',
	'Styled components',
	'Data fetching',
	'Localization',
	'Forms & validation',
	'JSDoc',
	'Unit Testing',
	'Responsive Design',
	'Express.js',
	'Firebase',
	'Global State Design',
	'C++',
	'MongoDB',
	'Authentication',
	'Python',
	'Vue',
	'Solid JS',
];

export default function Intro() {
	return (
		<Section id="home" maxW={{ '@xl': 'unset !important' }} w={{ '@xl': '100%' }}>
			<Box css={{ display: 'unset', '@xl': { display: 'none' } }}>
				<Heading level="1" textAlign="center" mb="$6" fontSize="$9xl">
					Ahmed Habeila
				</Heading>
				<Heading level="2" textAlign="center" mb="$6" fontSize="$2xl">
					Front-end Web Developer
				</Heading>
				<Text fontSize="$lg" mt="$12">
					Things I consider myself good at
				</Text>
				<Flex wrap="wrap" gap="$4" mt="$6">
					<For each={skills}>{(skill) => <Badge>{skill}</Badge>}</For>
				</Flex>
			</Box>
			<Box css={{ display: 'none', '@xl': { display: 'unset' } }}>
				<RotatingSkills />
			</Box>
		</Section>
	);
}

const BadgeAndLine = ({
	index,
	innerRadius,
	skill,
	outerRadius,
}: {
	skill: string;
	index: number;
	innerRadius: number;
	outerRadius: number;
}) => {
	const a = (innerRadius / 2) * ((index % fSections) * ((fMax - fMin) / fSections) + fMin) * randRange(0.9, 1.05);
	const b = a * aToBRatio;
	const circleAngle = (index / (skills.length - 1)) * 2 * Math.PI;

	const c = circleAngle <= Math.PI ? offsetAngle : 3 * offsetAngle;
	const angle = m * circleAngle + c;
	const xPosNeg = (a * b) / Math.sqrt(b ** 2 + a ** 2 * Math.tan(angle) ** 2);
	const posNegFactor = angle > Math.PI / 2 && angle < (Math.PI * 3) / 2 ? 1 : -1;

	const x = xPosNeg * posNegFactor;
	const y = x * Math.tan(angle);

	const xPosNeg1 = (a * b) / Math.sqrt(b ** 2 + a ** 2 * Math.tan(angle - oneTenthOfDeg) ** 2);
	const x1 = xPosNeg1 * posNegFactor;
	const y1 = x1 * Math.tan(angle - oneTenthOfDeg);
	const xPosNeg2 = (a * b) / Math.sqrt(b ** 2 + a ** 2 * Math.tan(angle + oneTenthOfDeg) ** 2);
	const x2 = xPosNeg2 * posNegFactor;
	const y2 = x2 * Math.tan(angle + oneTenthOfDeg);

	return (
		<>
			<StyledSvg>
				<defs>
					<linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
						{posNegFactor === 1 ? (
							<>
								<stop offset="0%" stop-color="transparent" />
								<stop offset="40%" stop-color="transparent" />
								<stop offset="100%" stop-color={colors.primary3} />
							</>
						) : (
							<>
								<stop offset="0%" stop-color={colors.primary3} />
								<stop offset="60%" stop-color="transparent" />
								<stop offset="100%" stop-color="transparent" />
							</>
						)}
					</linearGradient>
				</defs>
				<path
					d={`M ${outerRadius / 2} ${(outerRadius * aToBRatio) / 2} l ${x1} ${y1} l ${x2 - x1} ${y2 - y1} z`}
					fill={`url(#gradient-${index})`}
				/>
			</StyledSvg>
			<Badge
				position="absolute"
				top="50%"
				left="50%"
				zIndex={1}
				transform={`translate(calc(${x}px - 50%), calc(${y}px - 50%))`}
			>
				{skill}
			</Badge>
		</>
	);
};

const RotatingSkills = () => {
	const [rootRef, setRootRef] = createSignal<HTMLDivElement>();
	const size = createElementSize(rootRef);

	const [skillBadges, setSkillBadges] = createSignal<JSX.Element>();
	const [outerRadius, setOuterRadius] = createSignal(0);

	createEffect(() => {
		const outerRadius = Math.min(size.width ?? 0);
		setOuterRadius(outerRadius);
		const innerRadius = outerRadius - 75;

		const skillBadges = (
			<For each={skills}>
				{(skill, index) => (
					<BadgeAndLine skill={skill} index={index()} innerRadius={innerRadius} outerRadius={outerRadius} />
				)}
			</For>
		);

		setSkillBadges(skillBadges);
	});

	return (
		<Box w="100%" ref={setRootRef}>
			<Box
				pos="relative"
				d="flex"
				justifyContent="center"
				alignItems="center"
				w={outerRadius()}
				h={outerRadius() * aToBRatio}
				m="auto"
			>
				{skillBadges()}
				<Heading level="1" textAlign="center" mb="$6" fontSize="$9xl" zIndex={1}>
					Ahmed Habeila
				</Heading>
			</Box>
		</Box>
	);
};
