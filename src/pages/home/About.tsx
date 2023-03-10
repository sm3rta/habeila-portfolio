import { Box, Container, Divider, Flex, Grid, Image, Text, hope } from '@hope-ui/solid';
import { ComponentProps } from '@stitches/core';
import { styled } from 'solid-styled-components';
import { darkMode } from '../../App';
import { TILE_SIZE, colors, createOctagonalClipPathWithMargin, zIndexes } from '../../ui/theme';
import Section from './Section';
import { createMediaQuery } from '@solid-primitives/media';

const StyledImage = hope((props: any) => <img {...props} type="image/webp" height={TILE_SIZE} width={TILE_SIZE} />, {
	baseStyle: {
		clipPath: createOctagonalClipPathWithMargin(5),
	},
});
//  styled((props: ComponentProps<typeof Image>) => <img {...props} />)({
// 	clipPath: createOctagonalClipPathWithMargin(5),
// });

const ImageContainer = styled((props: ComponentProps<typeof Box>) => <Box {...props} />)({
	'@keyframes animLight': {
		'0%': { filter: `drop-shadow(0px 0px 5px ${colors.primary2})` },
		'100%': { filter: `drop-shadow(0px 0px 15px ${colors.primary2})` },
	},
	'@keyframes animDark': {
		'0%': { filter: `drop-shadow(0px 0px 5px ${colors.primary3})` },
		'100%': { filter: `drop-shadow(0px 0px 15px ${colors.primary3})` },
	},
});

export default function About() {
	const isSmall = createMediaQuery('(max-width: 768px)');

	const aboutProfessionalExperience = (
		<>
			<Text>
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
		</>
	);
	const aboutMePersonal = (
		<>
			<Text>I love the process of planning features, splitting them into components and implementing them.</Text>
			<Text mt="$6">
				While my career currently revolves around web development, I love everything programming which includes game
				development, Python, AHK and more
			</Text>
			<Text mt="$6">
				I like <b>gaming</b>, <b>food</b> and <b>photography</b>. I also love to <b>travel</b> and <b>explore</b> new
				places.
			</Text>
		</>
	);

	return (
		<Section id="about" upperSectionDivider bottomSectionDivider>
			<Container>
				<ImageContainer
					zIndex={zIndexes.aboveStar}
					pos="relative"
					animation={`${darkMode() ? 'animDark' : 'animLight'} 3s 0s ease-in-out infinite alternate`}
					mx="auto"
					w={TILE_SIZE}
					h={TILE_SIZE}
				>
					<StyledImage
						loading="lazy"
						// fallback={<div />}
						// srcset={`./assets/self-small.webp ${TILE_SIZE}w`}
						// sizes={`(max-width: 480px) ${TILE_SIZE}px`}
						srcset={`./assets/self.webp 990w, ./assets/self-small.webp ${TILE_SIZE}w`}
						sizes={`(max-width: 480px) ${TILE_SIZE}px, 990px`}
						alt="self image"
						width={TILE_SIZE}
						height={TILE_SIZE}
					/>
				</ImageContainer>

				{isSmall() ? (
					<Flex direction="column" mt="$10">
						<Box>{aboutProfessionalExperience}</Box>
						<Divider mt="$4" color={!darkMode() ? 'var(--hope-colors-neutral11)' : undefined} />
						<Box mt="$4">{aboutMePersonal}</Box>
					</Flex>
				) : (
					<Grid mt="$10" gridAutoFlow="column">
						<Box>{aboutProfessionalExperience}</Box>
						<Divider mx="$8" orientation="vertical" color={!darkMode() ? 'var(--hope-colors-neutral11)' : undefined} />
						<Box>{aboutMePersonal}</Box>
					</Grid>
				)}
			</Container>
		</Section>
	);
}
