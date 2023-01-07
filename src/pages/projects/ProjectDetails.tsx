import { Anchor, Badge, Box, Flex, Text } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { ProjectWithCompany } from '../../data/work';
import Carousel from './Carousel';

const renderProjectTitle = (name: string, link?: string) => {
	const company = <Text as="span">{name}</Text>;
	if (link) return <Anchor href={link}>{company}</Anchor>;
	else return company;
};

const ProjectLayoutDetailed = ({ project }: { project: ProjectWithCompany }) => (
	<Flex w="100%" direction="column" justifyContent="center" px="$4">
		<Box>
			{renderProjectTitle(project.name, project.website)}
			<Text as="span" fontSize="$sm">
				: {project.description}
			</Text>
		</Box>
		<Box>
			<Show when={project.technologies?.length}>
				<Text mt="$3">Technologies used</Text>
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={project.technologies}>{(tech) => <Badge>{tech}</Badge>}</For>
				</Flex>
			</Show>

			<Show when={project.responsibilities?.length}>
				<Text mt="$3">What I worked on</Text>
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={project.responsibilities}>{(resp) => <Badge>{resp}</Badge>}</For>
				</Flex>
			</Show>

			<Show when={project.tasks?.length}>
				<Carousel tasks={project.tasks!} />
			</Show>
		</Box>
	</Flex>
);

export default ProjectLayoutDetailed;
