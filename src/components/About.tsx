import { Container, Text, Heading } from '@hope-ui/solid';

export default function About() {
	return (
		<Container css={{ pt: 10 }}>
			<Heading level="1" textAlign="center" mb={2}>
				Ahmed Habeila
			</Heading>
			<Text textAlign="center" mb={2}>
				Front-end Web Developer
			</Text>

			<Text>
				I am a software developer based in Egypt, interested in web development, game development, Python scripting and
				all that includes programming. My work extends from system design, analysis to complete implementation. I'm
				currently working as a MERN stack developer focused on front-end, with flexibility to work on other stacks.
			</Text>
		</Container>
	);
}
