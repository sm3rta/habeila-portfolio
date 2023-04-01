import { Anchor, Badge, Box, Container, Flex, Text } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { Project } from '../../data/work';
import { SkillBadge } from '../home/SkillBadge';
import Carousel from './Carousel';

const renderProjectTitle = ({ name, website, renderTitle }: Project) => {
	if (renderTitle) return renderTitle();
	const project = (
		<Text as="span" fontSize="$lg">
			{name}
		</Text>
	);
	if (website) return <Anchor href={website}>{project}</Anchor>;
	else return project;
};

const ProjectLayoutDetailed = ({ project }: { project: Project }) => (
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
			{renderProjectTitle(project)}
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
