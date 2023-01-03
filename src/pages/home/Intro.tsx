import { Heading, Text } from '@hope-ui/solid';
import Section from './Section';
import { introText } from '../../data/work';

export default function Intro() {
	return (
		<Section id="home">
			<Heading level="1" textAlign="center" mb={2} fontSize="$9xl">
				Ahmed Habeila
			</Heading>
			<Heading level="2" textAlign="center" mb={2} fontSize="$2xl">
				Front-end Web Developer
			</Heading>
			<Text>{introText}</Text>
		</Section>
	);
}
