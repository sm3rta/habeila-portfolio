import { Box, Heading, Text } from '@hope-ui/solid';
import Section from './Section';

export default function Intro() {
	return (
		<Box id="home">
			<Heading level="1" textAlign="center" mb={2} fontSize="$9xl">
				Ahmed Habeila
			</Heading>
			<Heading level="3" textAlign="center" mb={2} fontSize="$2xl">
				Front-end Web Developer
			</Heading>
			<Section>
				<Text>
					I am a senior software engineer with 4 years of experience My work extends from system design and analysis to
					complete implementation, but front-end web development is where my passion truly lies working with React, Vue
					and Solid.js.
				</Text>
			</Section>
		</Box>
	);
}
