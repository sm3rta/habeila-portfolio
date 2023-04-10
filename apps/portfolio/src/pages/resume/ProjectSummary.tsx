import { Anchor, Box, Flex, ListItem, Text } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { Project } from '../../data/work';
import { SkillBadge } from '../home/SkillBadge';

const renderProjectTitle = ({ name, website, renderTitle }: Project) => {
	if (renderTitle) return renderTitle();
	const project = <Text>{name}</Text>;
	if (website) return <Anchor href={website}>{project}</Anchor>;
	else return project;
};

const ProjectSummary = ({ project }: { project: Project }) => (
	<Flex w="100%" direction="column" justifyContent="center">
		<Box>
			{renderProjectTitle(project)}

			{/* <Text as="span">: {project.description}</Text> */}
		</Box>
		<Box>
			{/* <Text mt="$4" fontWeight="$semibold" fontSize="$sm">
					Achievements
				</Text> */}
			<Flex mt="$2" direction="column" as="ul">
				<For each={project.achievements.filter((achievement) => !achievement.hideOnResume)}>
					{(achievement) => (
						<ListItem ml="$6" fontSize="$sm">
							{achievement.description}
						</ListItem>
					)}
				</For>
			</Flex>

			<Show when={project.technologies?.length}>
				{/* <Text mt="$4" fontWeight="$semibold" fontSize="$sm">
					Technologies used
				</Text> */}
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={project.technologies}>{(skill) => <SkillBadge skill={skill} />}</For>
				</Flex>
			</Show>

			{/* <Show when={project.responsibilities?.length}>
				<Text mt="$4" fontWeight="$semibold" fontSize="$sm">
					My responsibilities
				</Text>
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={project.responsibilities}>{(resp) => <Badge>{resp}</Badge>}</For>
				</Flex>
			</Show> */}
		</Box>
	</Flex>
);

export default ProjectSummary;
