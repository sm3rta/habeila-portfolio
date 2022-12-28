import { Box, Badge, List, ListItem, MenuItem, Text } from '@hope-ui/solid';
import { ProjectWithWork, projects } from '../../data/work';
import { Show, For } from 'solid-js';
import { Navigate, useParams } from '@solidjs/router';

export default function Project() {
	const params = useParams();
	const project = projects.find((p) => p.id === params.id);

	if (!project) return <Navigate href="/" />;

	return (
		<Box p={10} height="100%" width="100%" display="flex" flexDirection="column" gap="$4" justifyContent="center">
			<Text>{project.company.title}</Text>
			<Text>
				{project.company.from} - {project.company.to}
			</Text>
			<Text>{project.name}</Text>
			<Text>{project.website}</Text>

			<Text>technologies</Text>
			<Show when={project.technologies?.length}>
				<Box display="flex" gap="$2" flexWrap="wrap">
					<For each={project.technologies}>{(tech) => <Badge>{tech}</Badge>}</For>
				</Box>
			</Show>

			<Text>responsibilities</Text>
			<Show when={project.responsibilities?.length}>
				<Box display="flex" gap="$2" flexWrap="wrap">
					<For each={project.responsibilities}>{(resp) => <Badge>{resp}</Badge>}</For>
				</Box>
			</Show>
		</Box>
	);
}
