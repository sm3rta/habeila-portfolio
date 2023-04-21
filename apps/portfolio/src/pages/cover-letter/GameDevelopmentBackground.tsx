import { Anchor, Box, List, ListItem } from '@hope-ui/solid';
import { TextSpan } from '.';

export const GameDevelopmentBackground = () => (
	<Box>
		<TextSpan>
			I would also love to mention my experience with game development. I've studied game development with Unity and
			attended a few game jams. Here are a few of the side projects I created:
		</TextSpan>

		<List styleType="disc" ml="$6">
			<ListItem>
				<TextSpan>Bouncy Platformer</TextSpan>
				<List styleType="circle" ml="$6">
					<ListItem>
						<Anchor href="https://youtu.be/g2ZFCdLoV1s">
							<TextSpan>Gameplay video on YouTube</TextSpan>
						</Anchor>
					</ListItem>
				</List>
			</ListItem>
			<ListItem>
				<TextSpan>Pocket Tanks clone</TextSpan>
				<List styleType="circle" ml="$6">
					<ListItem>
						<Anchor href="https://github.com/sm3rta/pocket-tanks">
							<TextSpan>Github link</TextSpan>
						</Anchor>
					</ListItem>
					<ListItem>
						<Anchor href="https://youtu.be/WvTNJC5F9eE?t=19">
							<TextSpan>Video presentation</TextSpan>
						</Anchor>
					</ListItem>
				</List>
			</ListItem>
		</List>
	</Box>
);
