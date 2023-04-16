import { Box, Text } from '@hope-ui/solid';
import { useLocation, useResolvedPath } from '@solidjs/router';
import { Show } from 'solid-js';
import { BottomSectionDivider, UpperSectionDivider } from '../pages/home/SectionDivider';
import Fade from '../ui/components/Fade';
import { getAsteriskSectionColor, zIndexes } from '../ui/theme';

export const Footer = () => {
	const location = useLocation();
	const pathname = useResolvedPath(() => location.pathname);
	return (
		<Box
			minH={300}
			display="flex"
			flexDirection="column"
			justifyContent="flex-end"
			position="relative"
			zIndex={zIndexes.aboveStar}
			pointerEvents="none"
		>
			<Show when={pathname() === '/'}>
				<Fade in>
					<UpperSectionDivider />
				</Fade>
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
					px: '$4',
				}}
				placeContent={{
					'@initial': 'flex-start',
					'@sm': 'center',
				}}
			>
				<Text textAlign="center" alignSelf="center" verticalAlign="middle">
					@ {new Date().getFullYear()} Ahmed Habeila
				</Text>
			</Box>
		</Box>
	);
};
