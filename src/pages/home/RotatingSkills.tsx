import { Badge, Box, Heading } from '@hope-ui/solid';
import { createElementSize } from '@solid-primitives/resize-observer';
import { For, JSX, Show, createEffect, createSignal } from 'solid-js';
import { styled } from 'solid-styled-components';
import { colors } from '../../ui/theme';
import { randRange } from '../../utils';

const offsetAngle = 20 * (Math.PI / 180);
const oneTenthOfDeg = 0.1 * (Math.PI / 180);
const m = (Math.PI - 2 * offsetAngle) / Math.PI;
const StyledSvg = styled('svg')({ position: 'absolute', width: '100%', height: '100%' });
const aToBRatio = 0.4;

const fSections = 3;
const fMax = 1;
const fMin = 0.4;

const transitionTimeMs = 750;
const transitionTimeSec = transitionTimeMs / 1000;

export const skills = [
	'React',
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
	// index
	// fSections
	// skills.length
	// const cycleTime = transitionTimeMs / fSections;
	// const delay = (index % fSections) * cycleTime + (index / (skills.length / fSections)) * cycleTime;
	// const itemTransitionTime = transitionTimeMs / skills.length;
	const delay = (index * transitionTimeMs) / 8;
	// console.log(`🚀 ~ delay`, delay);

	const [firstRender, setFirstRender] = createSignal(true);
	createEffect(() => {
		if (firstRender()) {
			setTimeout(() => {
				setFirstRender(false);
			}, delay);
		}
	});

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
			<RenderAfterDelay delay={delay + transitionTimeMs / 4}>
				<StyledSvg>
					<defs>
						{posNegFactor === 1 ? (
							<linearGradient id={`gradient-${index}`}>
								<stop offset="40%" stop-color="transparent" />
								<stop offset="100%" stop-color={colors.primary3}>
									<animate dur={`${transitionTimeSec}s`} attributeName="offset" from="0.4" to="1" />
								</stop>
								<stop offset="100%" stop-color="transparent">
									<animate dur={`${transitionTimeSec}s`} attributeName="offset" from="0" to="1" />
								</stop>
							</linearGradient>
						) : (
							<linearGradient id={`gradient-${index}`}>
								<stop offset="0%" stop-color="transparent">
									<animate dur={`${transitionTimeSec}s`} attributeName="offset" from="1" to="0" />
								</stop>
								<stop offset="0%" stop-color={colors.primary3} />
								<stop offset="60%" stop-color="transparent">
									<animate dur={`${transitionTimeSec}s`} attributeName="offset" from="1" to="0.6" />
								</stop>
							</linearGradient>
						)}
					</defs>
					<path
						d={`M ${outerRadius / 2} ${(outerRadius * aToBRatio) / 2} l ${x1} ${y1} l ${x2 - x1} ${y2 - y1} z`}
						fill={`url(#gradient-${index})`}
					/>
				</StyledSvg>
			</RenderAfterDelay>
			<Badge
				position="absolute"
				top="50%"
				left="50%"
				zIndex={1}
				opacity={firstRender() ? 0 : 1}
				transform={firstRender() ? 'translate(0px, 0px)' : `translate(calc(${x}px - 50%), calc(${y}px - 50%))`}
				transition={`transform ${transitionTimeSec}s cubic-bezier(0.3, 0.41, 0.56, 0.78), opacity ${transitionTimeSec}s cubic-bezier(1, 0, 1, 1)`}
			>
				{skill}
			</Badge>
		</>
	);
};

export const RotatingSkills = () => {
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

const RenderAfterDelay = ({ delay, children }: { delay: number; children: JSX.Element }) => {
	const [show, setShow] = createSignal(false);

	createEffect(() => {
		if (!show()) {
			setTimeout(() => {
				setShow(true);
			}, delay);
		}
	});

	return <Show when={show()}>{children}</Show>;
};
