import { Anchor, Badge, Box, Container, Flex, Text } from '@hope-ui/solid';
import { For, Match, Show, Switch } from 'solid-js';
import { Project } from '../../data/work';
import { renderStringOrJsx } from '../../utils/renderStringOrJsx';
import { SkillBadge } from '../home/SkillBadge';
import Carousel from './Carousel';

const renderProjectTitle = (props: Project) => {
	const project = (
		<Text as="span" fontSize="$lg" data-id="ProjectDetails-text-1-7258e1">
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
		pt={{
			'@initial': '100px',
			'@md': '$48',
			'@lg': '$48',
		}}
		pb="$48"
		px={{
			'@initial': '$8',
			'@xl': '$48',
		}}
		data-id="ProjectDetails-container-1-6347c5"
	>
		<Box data-id="ProjectDetails-box-1-368ed3">
			{renderProjectTitle(props.project)}
			<Text as="span" fontSize="$sm" data-id="ProjectDetails-text-2-210598">
				: {renderStringOrJsx(props.project.description)}
			</Text>
		</Box>
		<Box data-id="ProjectDetails-box-2-4238b8">
			<Show when={props.project.technologies?.length}>
				<Text fontWeight="$bold" mt="$3" data-id="ProjectDetails-text-3-0ec690">
					Technologies used
				</Text>
				<Flex role="list" mt="$2" gap="$2" wrap="wrap" data-id="ProjectDetails-flex-1-aeae2b">
					<For each={props.project.technologies}>{(skill) => <SkillBadge skill={skill} />}</For>
				</Flex>
			</Show>

			<Show when={props.project.responsibilities?.length}>
				<Text fontWeight="$bold" mt="$3" data-id="ProjectDetails-text-4-d7c6c9">
					What I worked on
				</Text>
				<Flex role="list" mt="$2" gap="$2" wrap="wrap" data-id="ProjectDetails-flex-2-06583b">
					<For each={props.project.responsibilities}>{(resp) => <Badge role="listitem">{resp}</Badge>}</For>
				</Flex>
			</Show>

			<Show when={props.project.achievements?.length}>
				<Carousel projectId={props.project.id} achievements={props.project.achievements} />
			</Show>
		</Box>
	</Container>
);

export default ProjectLayoutDetailed;
