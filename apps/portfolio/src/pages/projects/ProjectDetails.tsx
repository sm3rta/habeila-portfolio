import { Anchor, Badge, Box, Container, Flex, Text } from '@hope-ui/solid';
import { For, Match, Show, Switch } from 'solid-js';
import { Project } from '../../data/work';
import { SkillBadge } from '../home/SkillBadge';
import Carousel from './Carousel';

const renderProjectTitle = (props: Project) => {
	const project = (
		<Text as="span" fontSize="$lg">
			{props.name}
		</Text>
	);

	return (
		<Switch>
			<Match when={props.renderTitle}>{props.renderTitle!()}</Match>
			<Match when={!props.renderTitle}>
				<Switch>
					<Match when={props.website}>
						<Anchor href={props.website}>{project}</Anchor>
					</Match>
					<Match when={!props.website}>{project}</Match>
				</Switch>
			</Match>
		</Switch>
	);
};

const ProjectLayoutDetailed = (props: { project: Project }) => (
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
			{renderProjectTitle(props.project)}
			<Text as="span" fontSize="$sm">
				: {props.project.description}
			</Text>
		</Box>
		<Box>
			<Show when={props.project.technologies?.length}>
				<Text fontWeight="$bold" mt="$3">
					Technologies used
				</Text>
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={props.project.technologies}>{(skill) => <SkillBadge skill={skill} />}</For>
				</Flex>
			</Show>

			<Show when={props.project.responsibilities?.length}>
				<Text fontWeight="$bold" mt="$3">
					What I worked on
				</Text>
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={props.project.responsibilities}>{(resp) => <Badge>{resp}</Badge>}</For>
				</Flex>
			</Show>

			<Show when={props.project.achievements?.length}>
				<Carousel achievements={props.project.achievements!} />
			</Show>
		</Box>
	</Container>
);

export default ProjectLayoutDetailed;
