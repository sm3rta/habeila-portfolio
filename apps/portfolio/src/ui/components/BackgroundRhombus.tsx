import { Box } from '@hope-ui/solid';
import Parallax from 'rallax.js';
import { createEffect, createSignal, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { generateRandomColor, randRange, randRangeInt } from '../../utils';
import { mobileCheck } from '../isMobileDevice';
import { zIndexes } from '../theme';

const isMobileDevice = mobileCheck();
const clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';

const leftRange = [-50, 150] as const;
const speedRange = [0.1, 0.7] as const;
const interactionDelayMs = 500;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const RhombusBase: typeof Box = styled(Box)({
	position: 'absolute',
	aspectRatio: '1',
	zIndex: zIndexes.rhombus,
	clipPath,
	cursor: 'unset',
	mixBlendMode: 'difference',
	transition: `background-color ${interactionDelayMs}ms ease-in-out`,
});

export const BackgroundRhombus = () => {
	const [delay, setDelay] = createSignal(0);

	const width = randRangeInt(15, 40);
	const top = `clamp(0px, ${randRangeInt(0, 100)}%, calc(100% - 100px))`;

	const leftRandom = randRangeInt(...leftRange);
	const left = `${leftRandom}%`;
	const animationDirection = leftRandom < 50 ? 'right' : 'left';

	const speed = randRange(...speedRange);
	const translateX = randRangeInt(1000) * (animationDirection === 'left' ? -1 : 1);
	const boxShadow = `0 0 ${(width * 4) / 5}px ${-width / 3}px #ffffff1f`;

	const [backgroundColor, setBackgroundColor] = createSignal<string>('transparent');

	const updateBackgroundColor = () => {
		setBackgroundColor(generateRandomColor());
	};

	createEffect(updateBackgroundColor);

	const animationDuration = randRangeInt(80, 120);
	const animation = () => `${animationDirection} ${animationDuration}s ${delay()}s ease-in-out infinite alternate`;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const Rhombus: typeof Box = styled(RhombusBase)({
		[`@keyframes ${animationDirection}`]: {
			'0%': { opacity: 0, marginLeft: '0px' },
			'5%': { opacity: 0.5 },
			'90%': { opacity: 0.5 },
			'100%': { opacity: 0, marginLeft: `${translateX}px` },
		},
	});

	const [ref, setRef] = createSignal<HTMLDivElement>();

	onMount(() => {
		if (ref() && !isMobileDevice) {
			new Parallax(ref()!, { speed });
		}
	});

	return (
		<Rhombus
			ref={setRef}
			w={width}
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
					updateBackgroundColor();
				}, interactionDelayMs);
			}}
		/>
	);
};
