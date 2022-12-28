import { Box, Text } from '@hope-ui/solid';

export const Footer = () => (
	<Box marginTop="auto" position="relative" zIndex={2} pointerEvents="none">
		<Box
			css={{
				backgroundImage: 'url(mountains.png)',
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
			<Text textAlign="center" alignSelf="center" verticalAlign="middle">
				copy right habeila
			</Text>
		</Box>
	</Box>
);
