import { Box, Text } from '@hope-ui/solid';
import { useLocation, useResolvedPath } from '@solidjs/router';
import { HEADER_HEIGHT, getAsteriskSectionColor, zIndexes } from '../ui/theme';
import { UpperSectionDivider, BottomSectionDivider } from '../pages/home/SectionDivider';
import { Show } from 'solid-js';

export const Footer = () => {
	const location = useLocation();
	const pathname = useResolvedPath(() => location.pathname);
	return (
		<Box
			// minH={`calc(100vh - ${HEADER_HEIGHT}px)`}
			minH={`300px`}
			display="flex"
			flexDirection="column"
			justifyContent="flex-end"
			position="relative"
			zIndex={zIndexes.aboveStar}
			pointerEvents="none"
		>
			<Show when={pathname() === '/'}>
				<UpperSectionDivider />
			</Show>

			<Show when={pathname() === '/resume'}>
				<Box height="100px" w="100%" pos="relative">
					<BottomSectionDivider />
				</Box>
			</Show>

			<Box
				css={{
					backgroundColor: getAsteriskSectionColor(),
					width: '100%',
					height: 40,
					display: 'flex',
					placeContent: 'center',
				}}
			>
				<Text textAlign="center" alignSelf="center" verticalAlign="middle" fontSize="$md">
					@ {new Date().getFullYear()} Ahmed Habeila
				</Text>
			</Box>
		</Box>
	);
};
