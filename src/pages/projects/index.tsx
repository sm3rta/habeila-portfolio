import { Box, Badge, List, ListItem, MenuItem, Text, Anchor } from '@hope-ui/solid';
import { ProjectWithCompany, projects } from '../../data/work';
import { Show, For, ComponentProps } from 'solid-js';
import { Navigate, useParams } from '@solidjs/router';

const renderProjectTitle = (name: string, link?: string) => {
	const company = <Text as="span">{name}</Text>;
	if (link) return <Anchor href={link}>{company}</Anchor>;
	else return company;
};

export const ProjectLayout = ({ project }: { project: ProjectWithCompany }) => {
	return (
		<Box h="100%" w="100%" d="flex" flexDirection="column" justifyContent="center">
			<Box>
				{renderProjectTitle(project.name, project.website)}:{' '}
				<Text as="span" fontSize="$sm">
					{project.description}
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
};

export default function Project() {
	const params = useParams();
	const project = projects.find((p) => p.id === params.id);

	if (!project) return <Navigate href="/" />;

	return <ProjectLayout project={project} />;
}
