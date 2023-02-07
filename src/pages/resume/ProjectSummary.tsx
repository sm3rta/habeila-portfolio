import { Anchor, Badge, Box, Flex, Text } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { ProjectWithCompany } from '../../data/work';

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
			<Show when={project.technologies?.length}>
				<Text mt="$3" fontWeight="$semibold" fontSize="$sm">
					Technologies used
				</Text>
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={project.technologies}>{(tech) => <Badge>{tech}</Badge>}</For>
				</Flex>
			</Show>

			<Show when={project.responsibilities?.length}>
				<Text mt="$3" fontWeight="$semibold" fontSize="$sm">
					What I worked on
				</Text>
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={project.responsibilities}>{(resp) => <Badge>{resp}</Badge>}</For>
				</Flex>
			</Show>
		</Box>
	</Flex>
);

export default ProjectSummary;
