import { createSignal, onCleanup } from 'solid-js';
import { styled } from 'solid-styled-components';
import { darkMode } from '../../App';
import { useTheme } from '@hope-ui/solid';

const switchSlideAfterMs = 10000;
const sections = 20;

const StyledPath = styled('path')({
	transition: `stroke-dashoffset ${switchSlideAfterMs / sections}ms linear`,
});

export const useLoopingSquareProgressBar = (callback?: () => void) => {
	const [value, setValue] = createSignal(0);
	const [paused, setPaused] = createSignal(false);

	const timer = callback
		? setInterval(() => {
				if (!paused()) {
					const currentValue = value();
					if (currentValue < sections) setValue(value() + 1);
					else {
						setValue(0);
						callback();
					}
				}
		  }, switchSlideAfterMs / sections)
		: undefined;

	onCleanup(() => {
		clearInterval(timer);
	});

	const resetProgress = () => {
		setValue(0);
	};

	const colors = useTheme()().colors

	const progressBar = (
		<svg
			viewBox="0 0 40 40"
			width="100%"
			height="100%"
			style={{
				position: 'absolute',
				'pointer-events': 'none',
			}}
			fill="none"
		>
			<StyledPath
				d="M 20 0 H 40 V 40 H 0 V 0 Z"
				stroke={colors.primary7.value}
				stroke-width={2}
				stroke-dasharray="160"
				stroke-dashoffset={`${((sections - value()) * 160) / sections}`}
			/>
		</svg>
	);

	return {
		value,
		paused,
		setPaused,
		resetProgress,
		progressBar,
	};
};
