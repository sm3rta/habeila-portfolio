import { Box } from '@hope-ui/solid';
import { createElementSize } from '@solid-primitives/resize-observer';
import { useLocation, useResolvedPath } from '@solidjs/router';
import { For, Show, createSignal } from 'solid-js';
import { BottomSectionDivider, sectionDividerHeight } from '../pages/home/SectionDivider';
import Fade from '../ui/components/Fade';
import Rhombus from '../ui/components/HeaderFooterRhombus';
import { getAsteriskSectionColor } from '../ui/theme';

export const Footer = () => {
	const [rootRef, setRootRef] = createSignal<HTMLDivElement>();
	const size = createElementSize(rootRef);

	const location = useLocation();
	const pathname = useResolvedPath(() => location.pathname);

	return (
		<Fade in={() => true}>
			<Show when={pathname() === '/resume'}>
				<Box height={sectionDividerHeight} w="100%" pos="relative">
					<BottomSectionDivider />
				</Box>
				<Box h="$8" css={{ backgroundColor: getAsteriskSectionColor() }} />
			</Show>
			<Box minH={100} ref={setRootRef} css={{ backgroundColor: getAsteriskSectionColor() }}>
				<svg width="100%" height={`${size.height ?? 100}px`}>
					<For each={[...Array(500)]}>{() => <Rhombus x={size.width} y={size.height} />}</For>
				</svg>
			</Box>
		</Fade>
	);
};
