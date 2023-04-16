import { Anchor, Box, Divider, Flex, List, ListItem } from '@hope-ui/solid';
import { For, Match, Show, Switch } from 'solid-js';
import { Workplace } from '../../data/work';
import { Text } from '../../ui/Text';
import { getTitle } from '../../utils/getTitle';
import ProjectSummary from './ProjectSummary';

const renderCompany = (name: string, link?: string) => {
	const company = <Text as="span">{name}</Text>;

	return (
		<Switch>
			<Match when={link}>
				<Anchor href={link}>{company}</Anchor>
			</Match>
			<Match when={!link}>{company}</Match>
		</Switch>
	);
};

export const CompanyProjects = (props: {
	company: Workplace;
	forceRole?: () => 'full' | 'se' | undefined;
	forceNonSenior?: () => boolean | undefined;
}) => {
	const projects = () => props.company.projects.filter((project) => !project.hideOnResume);
	return (
		<Flex h="100%" w="100%" direction="column" justifyContent="center">
			<Box d="flex" justifyContent="space-between">
				<Box d="inline">
					{props.company.title && (
						<Text variant="subtitle" as="span">
							{getTitle(
								props.forceRole?.() ?? props.company.title.role,
								props.forceNonSenior?.() ? !props.forceNonSenior() : props.company.title.senior
							)}
						</Text>
					)}
					{props.company.name === 'Self-employed' ? (
						<Text as="span"> (Self-employed)</Text>
					) : (
						<>
							<Text as="span"> at </Text>
							{renderCompany(props.company.name, props.company.website)}
						</>
					)}
				</Box>

				<Show when={props.company.from && props.company.to}>
					<Text>
						{props.company.from} - {props.company.to}
					</Text>
				</Show>
			</Box>

			<List d="flex" flexDirection="column">
				<For each={projects()}>
					{(project, index) => (
						<ListItem>
							<ProjectSummary project={project} />
							{index() !== projects().length - 1 && <Divider my="$3" />}
						</ListItem>
					)}
				</For>
			</List>
		</Flex>
	);
};
