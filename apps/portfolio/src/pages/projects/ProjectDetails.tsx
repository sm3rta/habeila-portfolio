import { Anchor, Badge, Box, Container, Flex, Text } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { ProjectWithCompany } from '../../data/work';
import { SkillBadge } from '../home/SkillBadge';
import Carousel from './Carousel';

const renderProjectTitle = (name: string, link?: string) => {
	const project = (
		<Text as="span" fontSize="$lg">
			{name}
		</Text>
	);
	if (link) return <Anchor href={link}>{project}</Anchor>;
	else return project;
};

const ProjectLayoutDetailed = ({ project }: { project: ProjectWithCompany }) => (
	<Container
		d="flex"
		flexDirection="column"
		justifyContent="center"
		p={{
			'@initial': '0 $4',
			'@lg': '$6 $8',
		}}
	>
		<Box>
			{renderProjectTitle(project.name, project.website)}
			<Text as="span" fontSize="$sm">
				: {project.description}
			</Text>
		</Box>
		<Box>
			<Show when={project.technologies?.length}>
				<Text fontWeight="$bold" mt="$3">
					Technologies used
				</Text>
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={project.technologies}>{(skill) => <SkillBadge skill={skill} />}</For>
				</Flex>
			</Show>

			<Show when={project.responsibilities?.length}>
				<Text fontWeight="$bold" mt="$3">
					What I worked on
				</Text>
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={project.responsibilities}>{(resp) => <Badge>{resp}</Badge>}</For>
				</Flex>
			</Show>

			<Show when={project.achievements?.length}>
				<Carousel achievements={project.achievements!} />
			</Show>
		</Box>
	</Container>
);

export default ProjectLayoutDetailed;
