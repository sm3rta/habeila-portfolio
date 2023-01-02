import { Anchor, Badge, Box, Text } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { ProjectWithCompany } from '../../data/work';

const renderProjectTitle = (name: string, link?: string) => {
	const company = <Text as="span">{name}</Text>;
	if (link) return <Anchor href={link}>{company}</Anchor>;
	else return company;
};

const ProjectSummary = ({ project }: { project: ProjectWithCompany }) => (
	<Box w="100%" d="flex" flexDirection="column" justifyContent="center">
		<Box>
			{renderProjectTitle(project.name, project.website)}
			<Text as="span" fontSize="$sm">
				: {project.description}
			</Text>
		</Box>
		<Box pl="$2">
			<Show when={project.technologies?.length}>
				<Text mt="$3">Technologies used</Text>
				<Box mt="$2" d="flex" gap="$2" flexWrap="wrap">
					<For each={project.technologies}>{(tech) => <Badge>{tech}</Badge>}</For>
				</Box>
			</Show>

			<Show when={project.responsibilities?.length}>
				<Text mt="$3">My responsibilities</Text>
				<Box mt="$2" d="flex" gap="$2" flexWrap="wrap">
					<For each={project.responsibilities}>{(resp) => <Badge>{resp}</Badge>}</For>
				</Box>
			</Show>
		</Box>
	</Box>
);

export default ProjectSummary;
