import { Anchor, Badge, Box, Text } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { ProjectWithCompany } from '../../data/work';
import Carousel from './Carousel';

const renderProjectTitle = (name: string, link?: string) => {
	const company = <Text as="span">{name}</Text>;
	if (link) return <Anchor href={link}>{company}</Anchor>;
	else return company;
};

const ProjectLayoutDetailed = ({ project }: { project: ProjectWithCompany }) => (
	<Box w="100%" d="flex" flexDirection="column" justifyContent="center" px="$4">
		<Box>
			{renderProjectTitle(project.name, project.website)}
			<Text as="span" fontSize="$sm">
				: {project.description}
			</Text>
		</Box>
		<Box>
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

			<Show when={project.tasks?.length}>
				<Carousel tasks={project.tasks!} />
			</Show>
		</Box>
	</Box>
);

export default ProjectLayoutDetailed;
