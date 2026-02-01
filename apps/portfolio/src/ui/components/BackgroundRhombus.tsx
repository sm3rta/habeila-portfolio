import { Box } from '@hope-ui/solid';
import Parallax from 'rallax.js';
import { createEffect, createSignal, onMount, Show } from 'solid-js';
import { styled } from 'solid-styled-components';
import { generateRandomColorBackgroundRhombus, randRange, randRangeInt } from '../../utils';
import { zIndexes } from '../theme';

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
	// mixBlendMode: 'difference',
	transition: `background-color ${interactionDelayMs}ms ease-in-out`,
});

export const BackgroundRhombus = () => {
	const [delay, setDelay] = createSignal(0);
	const [hoverCount, setHoverCount] = createSignal(0);
	const [isVisible, setIsVisible] = createSignal(true);
	const [isBursting, setIsBursting] = createSignal(false);

	const width = randRangeInt(18, 40);
	const top = `clamp(0px, ${randRangeInt(0, 100)}%, calc(100% - 100px))`;

	const leftRandom = randRangeInt(...leftRange);
	const left = `${leftRandom}%`;
	const animationDirection = leftRandom < 50 ? 'right' : 'left';

	const speed = randRange(...speedRange);
	const translateX = randRangeInt(1000) * (animationDirection === 'left' ? -1 : 1);
	const boxShadow = `0 0 ${(width * 4) / 5}px ${-width / 3}px #ffffff1f`;

	const [backgroundColor, setBackgroundColor] = createSignal<string>('transparent');

	const updateBackgroundColor = () => {
		setBackgroundColor(generateRandomColorBackgroundRhombus());
	};

	createEffect(updateBackgroundColor);

	const animationDuration = randRangeInt(80, 120);
	const animation = () => `${animationDirection} ${animationDuration}s ${delay()}s ease-in-out infinite alternate`;

	const burstDuration = 400;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const Rhombus: typeof Box = styled(RhombusBase)({
		[`@keyframes ${animationDirection}`]: {
			'0%': { opacity: 0, marginLeft: '0px' },
			'5%': { opacity: 0.5 },
			'90%': { opacity: 0.5 },
			'100%': { opacity: 0, marginLeft: `${translateX}px` },
		},
		'@keyframes burst': {
			'0%': { transform: 'translateY(var(--burst-translateY, 0px)) scale(1) rotate(0deg)', opacity: 1 },
			'50%': { transform: 'translateY(var(--burst-translateY, 0px)) scale(1.5) rotate(90deg)', opacity: 0.7 },
			'100%': { transform: 'translateY(var(--burst-translateY, 0px)) scale(2.5) rotate(180deg)', opacity: 0 },
		},
	});

	const [ref, setRef] = createSignal<HTMLDivElement>();
	const [parallaxInstance, setParallaxInstance] = createSignal<Parallax | null>(null);

	onMount(() => {
		if (ref()) {
			const instance = new Parallax(ref()!, { speed });
			setParallaxInstance(instance);
		}
	});

	return (
		<Show when={isVisible()}>
			<Rhombus
				ref={setRef}
				w={width}
				top={top}
				left={left}
				backgroundColor={backgroundColor()}
				boxShadow={boxShadow}
				animation={isBursting() ? `burst ${burstDuration}ms ease-out forwards` : animation()}
				pointerEvents={backgroundColor() === 'transparent' || isBursting() ? 'none' : 'all'}
				onMouseEnter={() => {
					const newCount = hoverCount() + 1;
					setHoverCount(newCount);
					setBackgroundColor('transparent');

					if (newCount < 2) {
						setTimeout(() => {
							setDelay(delay() - 8);
							updateBackgroundColor();
						}, interactionDelayMs);
					} else {
						// Lock position: disable parallax and start burst animation
						const element = ref();
						if (element) {
							// Get current computed position
							const computedStyle = window.getComputedStyle(element);
							const currentTransform = computedStyle.transform;
							const currentMarginLeft = computedStyle.marginLeft;

							// Destroy parallax to prevent further updates
							if (parallaxInstance()) {
								parallaxInstance()!.stop();
							}

							// Lock the current marginLeft from the animation
							if (currentMarginLeft) {
								element.style.marginLeft = currentMarginLeft;
							}

							// Lock the current transform (parallax translateY) and apply it to the burst animation
							if (currentTransform && currentTransform !== 'none') {
								// Extract the translateY value from the matrix
								const matrixMatch = currentTransform.match(/matrix\(([^)]+)\)/);
								if (matrixMatch) {
									const matrixValues = matrixMatch[1].split(',').map((v) => parseFloat(v.trim()));
									const translateY = matrixValues[5] || 0;
									// Update the burst animation to include the locked translateY
									element.style.setProperty('--burst-translateY', `${translateY}px`);
								}
							}
						}

						setIsBursting(true);

						// Wait for burst animation to complete before hiding
						setTimeout(() => {
							setIsVisible(false);
						}, burstDuration);
					}
				}}
			/>
		</Show>
	);
};
