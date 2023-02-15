import { Box, Container, Image, Text } from '@hope-ui/solid';
import { ComponentProps } from '@stitches/core';
import { styled } from 'solid-styled-components';
import { TILE_SIZE, createOctagonalClipPathWithMargin, zIndexes } from '../../ui/theme';
import Section from './Section';
import { darkMode } from '../../App';

const StyledImage = styled((props: ComponentProps<typeof Image>) => <Image {...props} />)({
	clipPath: createOctagonalClipPathWithMargin(5),
});

const ImageContainer = styled((props: ComponentProps<typeof Box>) => <Box {...props} />)({
	'@keyframes animLight': {
		'0%': { filter: 'drop-shadow(0px 0px 5px black)' },
		'100%': { filter: 'drop-shadow(0px 0px 15px black)' },
	},
	'@keyframes animDark': {
		'0%': { filter: 'drop-shadow(0px 0px 5px white)' },
		'100%': { filter: 'drop-shadow(0px 0px 15px white)' },
	},
});


export default function About() {
	
	return (
		<Section id="about" upperSectionDivider bottomSectionDivider>
			<Container>
				<ImageContainer
					zIndex={zIndexes.aboveStar}
					pos="relative"
					animation={`${darkMode()?"animDark": "animLight"} 3s 0s ease-in-out infinite alternate`}
					mx="auto"
					w={TILE_SIZE}
					h={TILE_SIZE}
				>
					<StyledImage
						loading="lazy"
						fallback={<div />}
						// srcset={`./assets/self-small.webp ${TILE_SIZE}w`}
						// sizes={`(max-width: 480px) ${TILE_SIZE}px`}
						srcset={`./assets/self.webp 990w, ./assets/self-small.webp ${TILE_SIZE}w`}
						sizes={`(max-width: 480px) ${TILE_SIZE}px, 990px`}
						alt="self image"
					/>
				</ImageContainer>

				<Text mt="$10">
					I have 5 years of professional experience in software engineering, mainly front-end development using{' '}
					<b>React</b>.
				</Text>
				<Text mt="$6">
					I worked on various projects and dived into a lot of concepts of front-end development, from content-driven
					websites focused on accessibility, keyboard navigation and SEO to data-driven web apps with complex forms,
					data-rich charts and tables, reusable UI components and design systems.
				</Text>
				<Text mt="$6">
					I have experience in <b>leading other developers</b>, reviewing their work and enforcing certain patterns,
					project-specific standards and <b>best practices</b>
				</Text>
				<Text mt="$6">
					I love the process of planning features, splitting them into components and implementing them.
				</Text>
				<Text mt="$6">
					While my career currently revolves around web development, I love everything programming which includes game
					development, Python, AHK and more
				</Text>
				<Text mt="$6">
					I like <b>gaming</b>, <b>food</b> and <b>photography</b>. I also love to <b>travel</b> and <b>explore</b> new
					places.
				</Text>
			</Container>
		</Section>
	);
}
