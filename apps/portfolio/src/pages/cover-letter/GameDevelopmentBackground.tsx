import { Anchor, Box, List, ListItem } from '@hope-ui/solid';
import { TextSpan } from '.';

export const GameDevelopmentBackground = () => (
	<Box data-id="GameDevelopmentBackground-box-1-43786d">
		<TextSpan>
			I would also love to mention my experience with game development. I've studied game development with Unity and
			attended a few game jams. Here are a few of the side projects I created:
		</TextSpan>

		<List styleType="disc" ml="$6" data-id="GameDevelopmentBackground-list-1-0a53e9">
			<ListItem data-id="GameDevelopmentBackground-listitem-1-50180b">
				<TextSpan>Bouncy Platformer</TextSpan>
				<List styleType="circle" ml="$6" data-id="GameDevelopmentBackground-list-2-a9e529">
					<ListItem data-id="GameDevelopmentBackground-listitem-2-e2ce11">
						<Anchor href="https://youtu.be/g2ZFCdLoV1s">
							<TextSpan>Gameplay video on YouTube</TextSpan>
						</Anchor>
					</ListItem>
				</List>
			</ListItem>
			<ListItem data-id="GameDevelopmentBackground-listitem-3-d90e34">
				<TextSpan>Pocket Tanks clone</TextSpan>
				<List styleType="circle" ml="$6" data-id="GameDevelopmentBackground-list-3-00b129">
					<ListItem data-id="GameDevelopmentBackground-listitem-4-a1500b">
						<Anchor href="https://github.com/sm3rta/pocket-tanks">
							<TextSpan>Github link</TextSpan>
						</Anchor>
					</ListItem>
					<ListItem data-id="GameDevelopmentBackground-listitem-5-a07b3f">
						<Anchor href="https://youtu.be/WvTNJC5F9eE?t=19">
							<TextSpan>Video presentation</TextSpan>
						</Anchor>
					</ListItem>
				</List>
			</ListItem>
		</List>
	</Box>
);
