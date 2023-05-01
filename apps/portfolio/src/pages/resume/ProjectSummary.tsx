import { Anchor, Badge, Box, Flex, ListItem, Text } from '@hope-ui/solid';
import { For, Match, Show, Switch } from 'solid-js';
import { Project } from '../../data/work';
import { renderStringOrJsx } from '../../utils/renderStringOrJsx';
import { SkillBadge } from '../home/SkillBadge';

const renderProjectTitle = (props: Project) => {
	const project = <Text as="span">{props.name}</Text>;
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
	<Flex w="100%" direction="column" justifyContent="center">
		<Box>
			{renderProjectTitle(props.project)}

			<Text as="span">: {renderStringOrJsx(props.project.description)}</Text>
		</Box>
		<Box>
			<Text mt="$4" fontWeight="$semibold" fontSize="$sm">
				Achievements
			</Text>
			<Flex mt="$2" direction="column" as="ul">
				<For each={props.project.achievements.filter((achievement) => !achievement.hideOnResume)}>
					{(achievement) => (
						<ListItem ml="$6">
							<Text fontSize="$sm">{renderStringOrJsx(achievement.description)}</Text>
						</ListItem>
					)}
				</For>
			</Flex>

			<Show when={props.project.technologies?.length}>
				<Text mt="$4" fontWeight="$semibold" fontSize="$sm">
					Technologies used
				</Text>
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={props.project.technologies}>{(skill) => <SkillBadge skill={skill} />}</For>
				</Flex>
			</Show>

			<Show when={props.project.responsibilities?.length}>
				<Text mt="$4" fontWeight="$semibold" fontSize="$sm">
					My responsibilities
				</Text>
				<Flex mt="$2" gap="$2" wrap="wrap">
					<For each={props.project.responsibilities}>{(resp) => <Badge>{resp}</Badge>}</For>
				</Flex>
			</Show>
		</Box>
	</Flex>
);

export default ProjectSummary;
