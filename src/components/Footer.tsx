import { Box, Text } from '@hope-ui/solid';
import { zIndexes } from '../ui/theme';

export const Footer = () => (
	<Box marginTop="auto" position="relative" zIndex={zIndexes.aboveStar} pointerEvents="none">
		<Box
			css={{
				backgroundImage: 'url(/assets/mountains.png)',
				backgroundPosition: 'center bottom',
				backgroundRepeat: 'repeat no-repeat',
				backgroundSize: 'contain',
				filter: 'drop-shadow(black 2px 4px 6px)',
				pointerEvents: 'none',
				width: '100vw',
				aspectRatio: 2,
			}}
		/>
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
