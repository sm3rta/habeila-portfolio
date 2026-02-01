import { Anchor, Box, Flex, List, ListItem } from '@hope-ui/solid';
import { For, Match, Show, Switch } from 'solid-js';
import { Workplace } from '../../data/work';
import { Text } from '../../ui/components/Text';
import { getTitle } from '../../utils/getTitle';
import ProjectSummary from './ProjectSummary';

const renderCompany = (props: Workplace) => {
	const company = <Text as="span">{props.name}</Text>;

	return (
		<>
			<Switch>
				<Match when={props.website}>
					<Anchor href={props.website}>{company}</Anchor>
				</Match>
				<Match when={!props.website}>{company}</Match>
			</Switch>
			<Show when={props.location}>
				<Text as="span">, {props.location}</Text>
			</Show>
		</>
	);
};

export const CompanyProjects = (props: {
	company: Workplace;
	forceRole?: 'full' | 'se' | undefined;
	forceNonSenior?: boolean | undefined;
}) => (
	<Flex h="100%" w="100%" direction="column" justifyContent="center">
		<Box d="flex" justifyContent="space-between">
			<Box d="inline">
				{props.company.title && (
					<Text variant="subtitle" as="span">
						{getTitle(
							props.forceRole ?? props.company.title.role,
							props.forceNonSenior !== undefined ? !props.forceNonSenior : props.company.title.senior
						)}
					</Text>
				)}
				<Show when={props.company.name === 'Self-employed'}>
					<Text as="span"> (Self-employed)</Text>
				</Show>
				<Show when={props.company.name !== 'Self-employed'}>
					<>
						<Text as="span"> at </Text>
						{renderCompany(props.company)}
					</>
				</Show>
			</Box>

			<Show when={props.company.from && props.company.to}>
				<Text>
					{props.company.from} - {props.company.to}
				</Text>
			</Show>
		</Box>

		<List d="flex" flexDirection="column" gap="$4" mt="$2">
			<For each={props.company.projects}>
				{(project) => (
					<ListItem>
						<ProjectSummary project={project} />
					</ListItem>
				)}
			</For>
		</List>
	</Flex>
);
