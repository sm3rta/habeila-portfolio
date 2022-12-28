import { Box, Heading, Container, Text } from '@hope-ui/solid';

const Intro = () => (
	<Box id="home">
		<Heading level="1" textAlign="center" mb={2} fontSize="$9xl">
			Ahmed Habeila
		</Heading>
		<Heading level="3" textAlign="center" mb={2} fontSize="$3xl">
			Front-end Web Developer
		</Heading>

		<Container css={{ pt: 10 }}>
			<Text>
				I am a software developer based in Egypt, interested in web development, game development, Python scripting and
				all that includes programming. My work extends from system design, analysis to complete implementation. I'm
				currently working as a MERN stack developer focused on front-end, with flexibility to work on other stacks.
			</Text>
		</Container>
	</Box>
);

export default Intro;
