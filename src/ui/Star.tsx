import { Box } from '@hope-ui/solid';
import Parallax from 'rallax.js';
import { ComponentProps, createSignal, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { generateRandomColor, randRange, randRangeInt } from '../utils';

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
const speedRange = [0.2, 0.4] as const;

const StarBase = (props: ComponentProps<typeof Box>) => {
	return (
		<Box
			position="absolute"
			__baseStyle={{ aspectRatio: '1' }}
			zIndex={1}
			clipPath={clipPath}
			cursor="unset"
			{...props}
		/>
	);
};

export const Star = () => {
	const [top, setTop] = createSignal(-1000);
	const width = randRangeInt(10, 40);
	const left = randRangeInt(...leftRange);
	const animationDirection = left < 50 ? 'right' : 'left';

	const speed = randRange(...speedRange);
	const translateX = randRangeInt(1000) * (animationDirection === 'left' ? -1 : 1);
	const boxShadow = `0 0 ${(width * 4) / 5}px ${-width / 3}px #ffffff1f`;

	const [backgroundColor, setBackgroundColor] = createSignal(generateRandomColor(0.2));

	const animation = `${animationDirection} ${randRangeInt(80, 120)}s ease-in-out alternate infinite`;
	// @dev: faster animation
	// const animation = `${animationDirection} ${randRangeInt(1, 3)}s ease-in-out alternate infinite`;
	// @dev: disable animation
	// const animation = '';

	const Star = styled(StarBase)({
		[`@keyframes ${animationDirection}`]: {
			'0%': { opacity: 0, marginLeft: 0 },
			'5%': { opacity: 1 },
			'90%': { opacity: 1 },
			'100%': { opacity: 0, marginLeft: `${translateX}px` },
		},
		transition: 'background-color 0.5s ease-in-out',
	});

	let ref: HTMLDivElement;

	onMount(() => {
		if (ref) {
			setTop(randRangeInt(0, document.body.scrollHeight));
			new Parallax(ref, { speed });
		}
	});

	return (
		<Star
			ref={(el: HTMLDivElement) => (ref = el)}
			width={`${width}px`}
			left={`${left}%`}
			top={`${top()}px`}
			backgroundColor={backgroundColor()}
			boxShadow={boxShadow}
			animation={animation}
			pointerEvents={backgroundColor() === 'transparent' ? 'none' : 'all'}
			onMouseEnter={() => {
				setBackgroundColor('transparent');
			}}
		/>
	);
};
