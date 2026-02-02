import { Box, Flex, Heading, Text } from '@hope-ui/solid';
import { For } from 'solid-js';
import { RotatingSkills, skills } from './RotatingSkills';
import Section from './Section';
import { SkillBadge } from './SkillBadge';

const breakpoint = '@xl';

export default function Intro() {
	return (
		<Section
			id="home"
			role="group"
			aria-label="Intro section"
			maxW={{ [breakpoint]: 'unset !important' }}
			w={{ [breakpoint]: '100%' }}
			bottomSectionDivider
			tabIndex={-1}
		>
			<Box css={{ display: 'unset', [breakpoint]: { display: 'none' } }} data-id="Intro-box-1-14a5af">
				<Heading
					level="1"
					textAlign="center"
					mb="$6"
					fontSize="$9xl"
					fontWeight="$hairline"
					data-id="Intro-heading-1-1b7422"
				>
					Ahmed Habeila
				</Heading>
				<Heading level="2" textAlign="center" mb="$6" fontSize="$2xl" data-id="Intro-heading-2-43489e">
					Full-stack Developer
				</Heading>
				<Text fontSize="$lg" mt="$12" data-id="Intro-text-1-20413d">
					Things I consider myself good at
				</Text>
				<Flex role="list" wrap="wrap" gap="$4" mt="$6" data-id="Intro-flex-1-2099b3">
					<For each={skills}>{(skill) => <SkillBadge skill={skill} />}</For>
				</Flex>
			</Box>
			<Box css={{ display: 'none', [breakpoint]: { display: 'unset' } }} data-id="Intro-box-2-ac9cc0">
				<RotatingSkills />
			</Box>
		</Section>
	);
}
