import { Box, Flex, Heading, Text } from '@hope-ui/solid';
import { For } from 'solid-js';
import { RotatingSkills, skills } from './RotatingSkills';
import Section from './Section';
import { SkillBadge } from './SkillBadge';

const breakpoint = '@xl';

export default function Intro() {
	return (
		<Section id="home" maxW={{ [breakpoint]: 'unset !important' }} w={{ [breakpoint]: '100%' }} bottomSectionDivider>
			<Box css={{ display: 'unset', [breakpoint]: { display: 'none' } }}>
				<Heading level="1" textAlign="center" mb="$6" fontSize="$9xl" fontWeight="$hairline">
					Ahmed Habeila
				</Heading>
				<Heading level="2" textAlign="center" mb="$6" fontSize="$2xl">
					Full-stack Developer
				</Heading>
				<Text fontSize="$lg" mt="$12">
					Things I consider myself good at
				</Text>
				<Flex wrap="wrap" gap="$4" mt="$6">
					<For each={skills}>{(skill) => <SkillBadge skill={skill} />}</For>
				</Flex>
			</Box>
			<Box css={{ display: 'none', [breakpoint]: { display: 'unset' } }}>
				<RotatingSkills />
			</Box>
		</Section>
	);
}
