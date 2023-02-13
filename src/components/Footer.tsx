import { Box, Text } from '@hope-ui/solid';
import { useLocation, useResolvedPath } from '@solidjs/router';
import { BottomSectionDivider, UpperSectionDivider } from '../pages/home/Section';
import { HEADER_HEIGHT, zIndexes } from '../ui/theme';

// export const Footer = () => (
// 	<Box
// 		minH={`calc(100vh - ${HEADER_HEIGHT}px)`}
// 		display="flex"
// 		flexDirection="column"
// 		justifyContent="flex-end"
// 		position="relative"
// 		zIndex={zIndexes.aboveStar}
// 		pointerEvents="none"
// 	>
// 		<Box
// 			css={{
// 				backgroundImage: 'url(/assets/mountains.png)',
// 				backgroundPosition: 'center bottom',
// 				backgroundRepeat: 'repeat no-repeat',
// 				backgroundSize: 'contain',
// 				filter: 'drop-shadow(black 2px 4px 6px)',
// 				pointerEvents: 'none',
// 				width: '100vw',
// 				aspectRatio: 2,
// 				// fix mountains not covering some area from the left
// 				marginLeft: '-2px',
// 			}}
// 		/>
// 		<Box
// 			css={{
// 				backgroundColor: 'black',
// 				width: '100%',
// 				height: 40,
// 				display: 'flex',
// 				placeContent: 'center',
// 			}}
// 		>
// 			<Text textAlign="center" alignSelf="center" verticalAlign="middle" fontSize="$md">
// 				@ {new Date().getFullYear()} Ahmed Habeila
// 			</Text>
// 		</Box>
// 	</Box>
// );

export const Footer = () => {
	const location = useLocation();
	const pathname = useResolvedPath(() => location.pathname);
	return (
		<Box
			minH={`calc(100vh - ${HEADER_HEIGHT}px)`}
			display="flex"
			flexDirection="column"
			justifyContent="flex-end"
			position="relative"
			zIndex={zIndexes.aboveStar}
			pointerEvents="none"
		>
			{pathname() === '/' && <UpperSectionDivider />}

			<Box
				height="100px"
				w="100%"
				pos="relative"
				css={{
					'& path': { fill: 'black !important' },
				}}
			>
				<BottomSectionDivider />
			</Box>

			<Box
				css={{
					backgroundColor: 'black',
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
