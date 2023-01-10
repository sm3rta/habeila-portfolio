import { Badge, BadgeProps, Box, Container, Flex, Heading, Text } from '@hope-ui/solid';
import Section from './Section';
import { introText } from '../../data/work';
import { For, JSX, createEffect, createSignal, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { randRangeInt } from '../../utils';
import { createElementSize } from '@solid-primitives/resize-observer';

const skills = [
	'React 18',
	'TypeScript',
	'Node.js',
	'Git',
	'Material UI',
	'Jira',
	'Sass',
	'JSS',
	'Styled components',
	'Data fetching',
	'Localization',
	'Forms & validation',
	'Responsive Design',
	'Unit Testing',
	'JSDoc',
	'Global State Design',
	'Express.js',
	'Firebase',
	'MongoDB',
	'Authentication',
	'C++',
	'Python',
	'Vue',
	'Solid JS',
];

export default function Intro() {
	return (
		<Section id="home" maxW="unset !important">
			<Box css={{ display: 'unset', '@lg': { display: 'none' } }}>
				<Heading level="1" textAlign="center" mb="$6" fontSize="$9xl">
					Ahmed Habeila
				</Heading>
				<Heading level="2" textAlign="center" mb="$6" fontSize="$2xl">
					Front-end Web Developer
				</Heading>
				<Text>{introText}</Text>
				<Flex wrap="wrap" gap="$4" mt="$8">
					<For each={skills}>{(skill) => <Badge>{skill}</Badge>}</For>
				</Flex>
			</Box>
			<Box css={{ display: 'none', '@lg': { display: 'unset' } }}>
				<RotatingSkills />
				<Container>
					<Text mt="$8">{introText}</Text>
				</Container>
			</Box>
		</Section>
	);
}

const RotatingSkills = () => {
	const [rootRef, setRootRef] = createSignal<HTMLDivElement>();
	const size = createElementSize(rootRef);

	const [skillBadges, setSkillBadges] = createSignal<JSX.Element>();
	const [outerRadius, setOuterRadius] = createSignal(0);

	createEffect(() => {
		const outerRadius = Math.min(size.width ?? 0, document.body.offsetHeight, 550);
		setOuterRadius(outerRadius);
		const innerRadius = outerRadius - 50;

		const skillBadges = (
			<For each={skills.sort(() => Math.random() - 0.5)}>
				{(skill, index) => {
					const angle = (index() / skills.length) * 2 * Math.PI;
					const radius = randRangeInt(innerRadius, innerRadius * 0.6);

					const x = (Math.cos(angle) * radius) / 2;
					const y = (Math.sin(angle) * radius) / 2;

					// @ts-ignore
					const StyledBox = styled(Box)({
						position: 'absolute',
						top: '50%',
						left: '50%',
						// animation: `circle-${index()} ${randRangeInt(40, 60)}s linear infinite`,
						animation: `circle-${index()} 40s linear infinite`,
						[`@keyframes circle-${index()}`]: {
							from: { transform: `rotate(0deg) translateX(calc(${x}px)) translateY(calc(${y}px)) rotate(0deg)` },
							to: { transform: `rotate(360deg) translateX(calc(${x}px)) translateY(calc(${y}px)) rotate(-360deg)` },
						},
					});

					return (
						<StyledBox>
							<Badge css={{ transform: 'translate(-50%, -50%)' }}>{skill}</Badge>
						</StyledBox>
					);
				}}
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
				h={outerRadius()}
				m="auto"
				css={{ '& > div': { mixBlendMode: 'exclusion' } }}
			>
				{skillBadges()}
				<Heading level="1" textAlign="center" mb="$6" fontSize="$9xl">
					Ahmed Habeila
				</Heading>
			</Box>
		</Box>
	);
};
