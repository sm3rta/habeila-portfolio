import { Anchor, Badge, Box, Flex, ListItem, Text } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { ProjectWithCompany } from '../../data/work';
import { SkillBadge } from '../home/SkillBadge';

const renderProjectTitle = (name: string, link?: string) => {
	const company = <Text as="span">{name}</Text>;
	if (link) return <Anchor href={link}>{company}</Anchor>;
	else return company;
};

const ProjectSummary = ({ project }: { project: ProjectWithCompany }) => (
	<Flex w="100%" direction="column" justifyContent="center">
		<Box>
			{renderProjectTitle(project.name, project.website)}
			<Text as="span">: {project.description}</Text>
		</Box>
		<Box>
			<Show when={project.achievements?.length}>
				<Text mt="$4" fontWeight="$semibold" fontSize="$sm">
					Achievements
				</Text>
				<Flex mt="$2" direction="column" as="ul">
					<For each={project.achievements}>
						{(achievement) => (
							<ListItem ml="$6" fontSize="$sm">
								{achievement.description}
							</ListItem>
						)}
					</For>
				</Flex>
			</Show>

			<Show when={project.technologies?.length}>
				<Text mt="$4" fontWeight="$semibold" fontSize="$sm">
					Technologies used
				</Text>
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={project.technologies}>{(skill) => <SkillBadge skill={skill} />}</For>
				</Flex>
			</Show>

			<Show when={project.responsibilities?.length}>
				<Text mt="$4" fontWeight="$semibold" fontSize="$sm">
					My responsibilities
				</Text>
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={project.responsibilities}>{(resp) => <Badge>{resp}</Badge>}</For>
				</Flex>
			</Show>
		</Box>
	</Flex>
);

export default ProjectSummary;
