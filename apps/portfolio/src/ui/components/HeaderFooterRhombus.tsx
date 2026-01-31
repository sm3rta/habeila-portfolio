import { useTheme } from '@hope-ui/solid';
import { createEffect, createSignal } from 'solid-js';
import { styled } from 'solid-styled-components';
import { generateRandomColor, randRangeInt } from '../../utils';
import { lightThemeColors } from '../theme';

const createPath = (d: number, x: number, y: number) => {
	return `M ${x + d / 2} ${y} L ${x} ${y + d / 2} L ${x + d / 2} ${y + d} L ${x + d} ${y + d / 2} Z`;
};

const StyledPath = styled('path')({
	transition: 'fill 0.2s ease-in-out',
});

const Rhombus = (props: { x: number | null; y: number | null }) => {
	const d = randRangeInt(10, 70);
	const [background, setBackground] = createSignal(generateRandomColor());
	const [x, setX] = createSignal(0);
	const [y, setY] = createSignal(0);

	createEffect(() => {
		setX(randRangeInt(-d / 2, (props.x ?? 100) + d / 2));
		setY(randRangeInt(1, (props.y ?? 100) - d / 2));
	});

	const colors = useTheme()().colors

	return (
		<StyledPath
			d={createPath(d, x(), y())}
			stroke-width={2}
			stroke={lightThemeColors.accent12}
			fill={background()}
			onMouseEnter={() => {
				setBackground(generateRandomColor());
			}}
			pointer-events="all"
		/>
	);
};

export default Rhombus;
