import { Box, Container, Divider, Flex, Grid, Text, hope, useTheme } from '@hope-ui/solid';
import { createMediaQuery } from '@solid-primitives/media';
import { ComponentProps } from '@stitches/core';
import { JSX } from 'solid-js';
import { styled } from 'solid-styled-components';
import { darkMode } from '../../App';
import { TILE_SIZE, createOctagonalClipPathWithMargin, zIndexes } from '../../ui/theme';
import Section from './Section';

const StyledImage = hope(
	(props: JSX.ImgHTMLAttributes<HTMLImageElement>) => <img alt="" {...props} height={TILE_SIZE} width={TILE_SIZE} />,
	{
		baseStyle: {
			clipPath: createOctagonalClipPathWithMargin(5),
		},
	}
);

const ImageContainer = styled((props: ComponentProps<typeof Box>) => <Box {...props} />)(() => {
	const colors = useTheme()().colors;
	return {
		'@keyframes glow': {
			'0%': { filter: `drop-shadow(0px 0px 5px ${colors.primary9.value})` },
			'100%': { filter: `drop-shadow(0px 0px 15px ${colors.primary9.value})` },
		},
	};
});

export default function About() {
	const isSmall = createMediaQuery('(max-width: 768px)');

	const aboutProfessionalExperience = (
		<>
			<Text>I have 7+ years of professional experience in software engineering.</Text>
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
			<Text>I love the process of planning features, breaking them down into components and implementing them.</Text>
			<Text mt="$6">
				While my career currently revolves around web development, I love everything programming which includes game
				development, Python, AHK and more
			</Text>
			<Text mt="$6">
				I like <b> landscape photography</b>, <b>making food</b> and <b>gaming</b>. I also love to <b>travel</b> and{' '}
				<b>explore</b> new places.
			</Text>
		</>
	);

	return (
		<Section id="about" upperSectionDivider bottomSectionDivider>
			<Container>
				<ImageContainer
					zIndex={zIndexes.aboveRhombus}
					pos="relative"
					animation="glow 3s 0s ease-in-out infinite alternate"
					mx="auto"
					w={TILE_SIZE}
					h={TILE_SIZE}
				>
					<StyledImage
						loading="lazy"
						srcset="/assets/self-small.webp 160w, /assets/self.webp 990w"
						sizes="(max-width: 600px) 160px,
									 990px"
						src="/assets/self.webp"
						alt="self image"
						width={TILE_SIZE}
						height={TILE_SIZE}
					/>
				</ImageContainer>

				{isSmall() ? (
					<Flex direction="column" mt="$10">
						<Box>{aboutProfessionalExperience}</Box>
						<Divider mt="$4" color={!darkMode() ? '$neutral11' : undefined} />
						<Box mt="$4">{aboutMePersonal}</Box>
					</Flex>
				) : (
					<Grid mt="$16" gridAutoFlow="column">
						<Box>{aboutProfessionalExperience}</Box>
						<Divider mx="$8" orientation="vertical" color={!darkMode() ? '$neutral11' : undefined} />
						<Box>{aboutMePersonal}</Box>
					</Grid>
				)}
			</Container>
		</Section>
	);
}
