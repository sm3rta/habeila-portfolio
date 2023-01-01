import { Container, Image, Text } from '@hope-ui/solid';
import { TILE_SIZE } from '../../ui/theme';
import Section from './Section';

export default function About() {
	return (
		<Section id="about">
			<Container>
				<Image
					loading="lazy"
					fallback={<div />}
					src="self.webp"
					alt="self image"
					borderRadius="50%"
					w={TILE_SIZE}
					h={TILE_SIZE}
					mx="auto"
				/>
				<Text mt="$4">
					While my career currently revolves around web development, I love everything programming which includes game
					development, Python, AHK and more
				</Text>
				<Text mt="$4">I like gaming and food. I also love to travel and explore new places.</Text>
			</Container>
		</Section>
	);
}
