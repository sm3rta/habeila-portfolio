import { Container, Image, Text } from '@hope-ui/solid';
import { ComponentProps } from '@stitches/core';
import { styled } from 'solid-styled-components';
import { introText } from '../../data/work';
import { TILE_SIZE } from '../../ui/theme';
import Section from './Section';

const StyledImage = styled((props: ComponentProps<typeof Image>) => <Image {...props} />)({
	'@keyframes anim': {
		'0%': { boxShadow: 'white 0 0 10px -7px' },
		'100%': { boxShadow: 'white 0 0 20px -7px' },
	},
});

export default function About() {
	return (
		<Section id="about">
			<Container>
				<StyledImage
					loading="lazy"
					fallback={<div />}
					srcset={`./assets/self.webp 990w, ./assets/self-small.webp ${TILE_SIZE}w`}
					sizes={`(max-width: 480px) ${TILE_SIZE}px, 990px`}
					alt="self image"
					borderRadius="50%"
					w={TILE_SIZE}
					h={TILE_SIZE}
					mx="auto"
					animation="anim 5s 0s ease-in-out infinite alternate"
				/>

				<Text mt="$10">{introText}</Text>
				<Text mt="$4">
					While my career currently revolves around web development, I love everything programming which includes game
					development, Python, AHK and more
				</Text>
				<Text mt="$4">I like gaming, food and photography. I also love to travel and explore new places.</Text>
			</Container>
		</Section>
	);
}
