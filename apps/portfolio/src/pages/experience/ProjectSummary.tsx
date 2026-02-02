import { Anchor, Badge, Box, Flex, Heading, ListItem, Text } from '@hope-ui/solid';
import { For, Match, Show, Switch } from 'solid-js';
import { Project } from '../../data/work';
import { renderStringOrJsx } from '../../utils/renderStringOrJsx';
import { SkillBadge } from '../home/SkillBadge';

const renderProjectTitle = (props: Project) => {
	const project = (
		<Text as="span" data-id="ProjectSummary-text-1-68f7df">
			{props.name}
		</Text>
	);
	return (
		<Switch>
			<Match when={props.renderTitle}>{props.renderTitle!()}</Match>
			<Match when={!props.renderTitle}>
				<Switch>
					<Match when={props.website}>
						<Anchor href={props.website} d="inline-flex">
							{project}
						</Anchor>
					</Match>
					<Match when={!props.website}>{project}</Match>
				</Switch>
			</Match>
		</Switch>
	);
};

const ProjectSummary = (props: { project: Project }) => (
	<Flex
		role="listitem"
		aria-label={`Project: ${props.project.name}`}
		w="100%"
		direction="column"
		justifyContent="center"
		data-id="ProjectSummary-flex-1-a8940c"
	>
		<Heading level={3} data-id="ProjectSummary-heading-1-2cfa4b">
			{renderProjectTitle(props.project)}

			<Text as="span" data-id="ProjectSummary-text-2-f50b77">
				: {renderStringOrJsx(props.project.description)}
			</Text>
		</Heading>
		<Box data-id="ProjectSummary-box-1-561a31">
			<Heading level={4} mt="$4" fontWeight="$semibold" fontSize="$sm" data-id="ProjectSummary-heading-2-15cf17">
				Achievements
			</Heading>
			<Flex mt="$2" direction="column" as="ul" data-id="ProjectSummary-flex-2-32710f" aria-label="Achievements">
				<For each={props.project.achievements.filter((achievement) => !achievement.hideOnResume)}>
					{(achievement) => (
						<ListItem ml="$6" data-id="ProjectSummary-listitem-1-cb85c4">
							<Text fontSize="$sm" data-id="ProjectSummary-text-3-438ba1">
								{renderStringOrJsx(achievement.description)}
							</Text>
						</ListItem>
					)}
				</For>
			</Flex>

			<Show when={props.project.technologies?.length}>
				<Heading level={4} mt="$4" fontWeight="$semibold" fontSize="$sm" data-id="ProjectSummary-heading-3-d9caef">
					Technologies used
				</Heading>
				<Flex
					role="list"
					mt="$2"
					gap="$2"
					wrap="wrap"
					data-id="ProjectSummary-flex-3-c61b60"
					aria-label="Technologies used"
				>
					<For each={props.project.technologies}>{(skill) => <SkillBadge skill={skill} />}</For>
				</Flex>
			</Show>

			<Show when={props.project.responsibilities?.length}>
				<Heading level={4} mt="$4" fontWeight="$semibold" fontSize="$sm" data-id="ProjectSummary-heading-4-341fc3">
					My responsibilities
				</Heading>
				<Flex
					role="list"
					mt="$2"
					gap="$2"
					wrap="wrap"
					data-id="ProjectSummary-flex-4-2a47d3"
					aria-label="Responsibilities"
				>
					<For each={props.project.responsibilities}>{(resp) => <Badge role="listitem">{resp}</Badge>}</For>
				</Flex>
			</Show>
		</Box>
	</Flex>
);

export default ProjectSummary;
