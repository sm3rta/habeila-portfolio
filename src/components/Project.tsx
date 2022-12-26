import { Box, Badge, List, ListItem, MenuItem, Text } from '@hope-ui/solid';
import { ProjectWithWork } from '../data/work';
import { Show, For } from 'solid-js';

export default function Project({ project }: { project: ProjectWithWork }) {
	return (
		<Box p={10} height="100%" width="100%" display="flex" flexDirection="column" gap={1} justifyContent="center">
			<Text>{project.company.title}</Text>
			<Text>
				{project.company.from} - {project.company.to}
			</Text>
			<Text>{project.name}</Text>
			<Text>{project.website}</Text>

			<Text>technologies</Text>
			<Show when={project.technologies?.length}>
				<Box display="flex" gap={1} flexWrap="wrap">
					<For each={project.technologies}>{(tech) => <Badge>{tech}</Badge>}</For>
				</Box>
			</Show>

			<Text>responsibilities</Text>
			<Show when={project.responsibilities?.length}>
				<Box display="flex" gap={1} flexWrap="wrap">
					<For each={project.responsibilities}>{(resp) => <Badge>{resp}</Badge>}</For>
				</Box>
			</Show>
		</Box>
	);
}
