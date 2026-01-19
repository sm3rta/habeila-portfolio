import { Box, Heading } from '@hope-ui/solid';
import { createElementSize } from '@solid-primitives/resize-observer';
import { IconTypes } from 'solid-icons';
import { IoAccessibilitySharp } from 'solid-icons/io';
import {
	SiAstro,
	SiAuth0,
	SiCplusplus,
	SiExpress,
	SiFigma,
	SiFirebase,
	SiGit,
	SiJira,
	SiMaterialdesign,
	SiNextdotjs,
	SiNodedotjs,
	SiPython,
	SiReact,
	SiReacthookform,
	SiRedux,
	SiSass,
	SiSolid,
	SiTailwindcss,
	SiTestinglibrary,
	SiTypescript
} from 'solid-icons/si';
import { TbBrandRadixUi } from 'solid-icons/tb';
import { For, JSX, Show, createEffect, createSignal, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { colors } from '../../ui/theme';
import { randRange, randRangeInt } from '../../utils';
import { SkillBadge } from './SkillBadge';

const StyledSvg = styled('svg')({ position: 'absolute', width: '100%', height: '100%' });

export const skills: {
	name: string;
	Icon: IconTypes | null;
}[] = [
	{ name: 'React', Icon: SiReact },
	{ name: 'TypeScript', Icon: SiTypescript },
	{ name: 'Astro', Icon: SiAstro },
	{ name: 'Next.js', Icon: SiNextdotjs },
	{ name: 'Tailwind CSS', Icon: SiTailwindcss },
	{ name: 'Node.js', Icon: SiNodedotjs },
	{ name: 'Git', Icon: SiGit },
	{ name: 'Jira', Icon: SiJira },
	{ name: 'Material UI', Icon: SiMaterialdesign },
	{ name: 'Radix UI', Icon: TbBrandRadixUi },
	{ name: 'Sass', Icon: SiSass },
	{ name: 'Design systems', Icon: SiFigma },
	{ name: 'Accessibility', Icon: IoAccessibilitySharp },
	{ name: 'Forms & validation', Icon: SiReacthookform },
	{ name: 'Express.js', Icon: SiExpress },
	{ name: 'C++', Icon: SiCplusplus },
	{ name: 'Responsive Design', Icon: null },
	{ name: 'Authentication', Icon: SiAuth0 },
	{ name: 'JSDoc', Icon: null },
	{ name: 'Firebase', Icon: SiFirebase },
	{ name: 'Unit Testing', Icon: SiTestinglibrary },
	{ name: 'Redux', Icon: SiRedux },
	{ name: 'Python', Icon: SiPython },
	{ name: 'Solid JS', Icon: SiSolid },
];

// constants
const fMax = 1.1;
const fMin = 0.4;
const randMin = 0.9;
const randMax = 1.05;
const aToBRatio = 0.45;
const oneTenthOfDeg = 0.1 * (Math.PI / 180);
const transitionTimeMs = 750;
const transitionTimeSec = transitionTimeMs / 1000;

const BadgeAndLine = (props: {
	skill: { name: string; Icon: IconTypes | null };
	index: number;
	innerRadius: number;
	outerRadius: number;
}) => {
	const [firstRender, setFirstRender] = createSignal(true);
	const [params, setParams] = createSignal({
		x: 0,
		y: 0,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		delay: 0,
		posNegFactor: 1,
	});

	createEffect(() => {
		// const fSections = 3;
		const fSections = randRangeInt(3, 4);
		const offsetAngle = randRange(15, 20) * (Math.PI / 180);
		const m = (Math.PI - 2 * offsetAngle) / Math.PI;

		const delay = (props.index * transitionTimeMs) / 8;
		const a =
			(props.innerRadius / 2) *
			((props.index % fSections) * ((fMax - fMin) / fSections) + fMin) *
			randRange(randMin, randMax);
		const b = a * aToBRatio;
		const circleAngle = (props.index / (skills.length - 1)) * 2 * Math.PI;

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

		setParams({
			x,
			y,
			x1,
			y1,
			x2,
			y2,
			delay,
			posNegFactor,
		});
		setTimeout(() => {
			setFirstRender(false);
		}, delay);
	});

	const opacity = () => (firstRender() ? 0 : 1);
	const transform = () =>
		firstRender() ? 'translate(0px, 0px)' : `translate(calc(${params().x}px - 50%), calc(${params().y}px - 50%))`;

	return (
		<>
			<RenderAfterDelay delay={params().delay + transitionTimeMs / 4}>
				<StyledSvg>
					<defs>
						{params().posNegFactor === 1 ? (
							<linearGradient id={`gradient-${props.index}`}>
								<stop offset="40%" stop-color="transparent" />
								<stop offset="100%" stop-color={colors.primary3}>
									<animate dur={`${transitionTimeSec}s`} attributeName="offset" from="0.4" to="1" />
								</stop>
								<stop offset="100%" stop-color="transparent">
									<animate dur={`${transitionTimeSec}s`} attributeName="offset" from="0" to="1" />
								</stop>
							</linearGradient>
						) : (
							<linearGradient id={`gradient-${props.index}`}>
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
						d={`M ${props.outerRadius / 2} ${(props.outerRadius * aToBRatio) / 2} l ${params().x1} ${params().y1} l ${
							params().x2 - params().x1
						} ${params().y2 - params().y1} z`}
						fill={`url(#gradient-${props.index})`}
					/>
				</StyledSvg>
			</RenderAfterDelay>
			<SkillBadge
				skill={props.skill}
				position="absolute"
				top="50%"
				left="50%"
				zIndex={1}
				opacity={opacity}
				transform={transform}
				transition={`transform ${transitionTimeSec}s cubic-bezier(0.3, 0.41, 0.56, 0.78), opacity ${transitionTimeSec}s cubic-bezier(1, 0, 1, 1)`}
			/>
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
				<Heading level="1" textAlign="center" mb="$6" fontSize="$9xl" zIndex={1} fontWeight="$hairline">
					Ahmed Habeila
				</Heading>
			</Box>
		</Box>
	);
};

const RenderAfterDelay = (props: { delay: number; children: JSX.Element }) => {
	const [show, setShow] = createSignal(false);

	onMount(() => {
		setTimeout(() => {
			setShow(true);
		}, props.delay);
	});

	return <Show when={show()}>{props.children}</Show>;
};
