import { createElementSize } from '@solid-primitives/resize-observer';
import { For, createEffect, createSignal } from 'solid-js';
import Fade from '../ui/components/Fade';
import Rhombus from '../ui/components/HeaderFooterRhombus';
import { clamp, randRangeInt } from '../utils';
import { zIndexes } from '../ui/theme';
import { createMediaQuery } from '@solid-primitives/media';

const f = (x: number, maxX: number, maxY: number) => {
	const xNormalized = x / maxX;
	const yNormalized = clamp(0, 0.03 / xNormalized - 0.03, 1);
	const y = yNormalized * maxY;
	return y;
};

const R: typeof Rhombus = (props) => {
	const [x, setX] = createSignal(0);
	const [y, setY] = createSignal(0);

	createEffect(() => {
		const x = randRangeInt(0, (props.x ?? 0) - 200);
		const y = f(x, props.x ?? 0, props.y ?? 0);
		setX(x);
		setY(y);
	});

	return <Rhombus x={x()} y={y()} />;
};

export const HeaderRhombi = () => {
	const [rootRef, setRootRef] = createSignal<HTMLDivElement>();
	const size = createElementSize(rootRef);
	const isSmall = createMediaQuery('(max-width: 1280px)');

	return (
		<Fade in={() => true}>
			<svg
				width="100vw"
				height="100vh"
				pointer-events="none"
				ref={setRootRef}
				style={{ position: 'absolute', 'z-index': zIndexes.rhombus, overflow: 'visible' }}
			>
				<For each={[...Array(isSmall() ? 300 : 1500)]}>
					{() => {
						return <R x={size.width} y={isSmall() ? 200 : size.height} />;
					}}
				</For>
			</svg>
		</Fade>
	);
};
