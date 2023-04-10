import { Box, Text } from '@hope-ui/solid';
import { useLocation, useResolvedPath } from '@solidjs/router';
import { Show } from 'solid-js';
import { BottomSectionDivider, UpperSectionDivider } from '../pages/home/SectionDivider';
import { getAsteriskSectionColor, zIndexes } from '../ui/theme';

export const Footer = () => {
	const location = useLocation();
	const pathname = useResolvedPath(() => location.pathname);
	return (
		<Box
			minH={`300px`}
			display="flex"
			flexDirection="column"
			justifyContent="flex-end"
			position="relative"
			zIndex={zIndexes.aboveStar}
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
				<Text textAlign="center" alignSelf="center" verticalAlign="middle">
					@ {new Date().getFullYear()} Ahmed Habeila
				</Text>
			</Box>
		</Box>
	);
};
