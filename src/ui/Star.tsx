import { Box } from '@hope-ui/solid';
import Parallax from 'rallax.js';
import { ComponentProps, createSignal, onMount, onCleanup } from 'solid-js';
import { styled } from 'solid-styled-components';
import { generateRandomColor, randRange, randRangeInt } from '../utils';
import { HEADER_HEIGHT, zIndexes } from './theme';

const m = 5;
const clipPath = `polygon(0 50%, \
	${50 - m}% ${50 - m}%,\
	50% 0,\
	${50 + m}% ${50 - m}%,\
	100% 50%,\
	${50 + m}% ${50 + m}%,\
	50% 100%,\
	${50 - m}% ${50 + m}%)`;

const leftRange = [-50, 150] as const;
const speedRange = [0.1, 0.7] as const;
const starAlpha = 0.4;
const interactionDelayMs = 500;

const StarBase = (props: ComponentProps<typeof Box>) => (
	<Box
		css={{
			position: 'absolute',
			aspectRatio: '1',
			zIndex: zIndexes.star,
			clipPath: clipPath,
			cursor: 'unset',
			mixBlendMode: 'screen',
			transition: `background-color ${interactionDelayMs}ms ease-in-out`,
		}}
		{...props}
	/>
);

export const Star = () => {
	const [delay, setDelay] = createSignal(0);

	const width = randRangeInt(15, 40);
	const top = `clamp(${HEADER_HEIGHT}px, ${randRangeInt(0, 100)}%, calc(100% - 40px))`;

	const leftRandom = randRangeInt(...leftRange);
	const left = `${leftRandom}%`;
	const animationDirection = leftRandom < 50 ? 'right' : 'left';

	const speed = randRange(...speedRange);
	const translateX = randRangeInt(1000) * (animationDirection === 'left' ? -1 : 1);
	const boxShadow = `0 0 ${(width * 4) / 5}px ${-width / 3}px #ffffff1f`;

	const [backgroundColor, setBackgroundColor] = createSignal(generateRandomColor(starAlpha));

	const animationDuration = randRangeInt(80, 120);
	const animation = () => `${animationDirection} ${animationDuration}s ${delay()}s ease-in-out infinite alternate`;

	const Star = styled(StarBase)({
		[`@keyframes ${animationDirection}`]: {
			'0%': { opacity: 0, marginLeft: '0px' },
			'5%': { opacity: 1 },
			'90%': { opacity: 1 },
			'100%': { opacity: 0, marginLeft: `${translateX}px` },
		},
	});

	let [ref, setRef] = createSignal<HTMLDivElement>();

	onMount(() => {
		if (ref()) {
			new Parallax(ref(), { speed });
		}
	});

	return (
		<Star
			ref={setRef}
			w={`${width}px`}
			top={top}
			left={left}
			backgroundColor={backgroundColor()}
			boxShadow={boxShadow}
			animation={animation()}
			pointerEvents={backgroundColor() === 'transparent' ? 'none' : 'all'}
			onMouseEnter={() => {
				setBackgroundColor('transparent');
				setTimeout(() => {
					setDelay(delay() - 8);
					setBackgroundColor(generateRandomColor(starAlpha));
				}, interactionDelayMs);
			}}
		/>
	);
};
