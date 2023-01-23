import { Badge, Box, Flex, Heading, Text } from '@hope-ui/solid';
import { For } from 'solid-js';
import Section from './Section';
import { RotatingSkills, skills } from './RotatingSkills';

// const breakpoint = '@xl'
const breakpoint = '@xl';

export default function Intro() {
	return (
		<Section id="home" maxW={{ [breakpoint]: 'unset !important' }} w={{ [breakpoint]: '100%' }}>
			<Box css={{ display: 'unset', [breakpoint]: { display: 'none' } }}>
				<Heading level="1" textAlign="center" mb="$6" fontSize="$9xl">
					Ahmed Habeila
				</Heading>
				<Heading level="2" textAlign="center" mb="$6" fontSize="$2xl">
					Front-end Web Developer
				</Heading>
				<Text fontSize="$lg" mt="$12">
					Things I consider myself good at
				</Text>
				<Flex wrap="wrap" gap="$4" mt="$6">
					<For each={skills}>{(skill) => <Badge>{skill}</Badge>}</For>
				</Flex>
			</Box>
			<Box css={{ display: 'none', [breakpoint]: { display: 'unset' } }}>
				<RotatingSkills />
			</Box>
		</Section>
	);
}
