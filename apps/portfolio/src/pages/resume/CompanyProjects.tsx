import { Anchor, Box, Divider, Flex, List, ListItem, Text } from '@hope-ui/solid';
import { For, Match, Show, Switch } from 'solid-js';
import { darkMode } from '../../App';
import { Workplace } from '../../data/work';
import { colors } from '../../ui/theme';
import { getTitle } from '../../utils/getTitle';
import { renderStringOrJsx } from '../../utils/renderStringOrJsx';
import ProjectSummary from './ProjectSummary';

const renderCompany = (name: string, link?: string) => {
	const company = (
		<Text as="span" fontSize="$lg">
			{name}
		</Text>
	);

	return (
		<Switch>
			<Match when={link}>
				<Anchor fontSize="$lg" href={link}>
					{company}
				</Anchor>
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
			<Box>
				{props.company.title && (
					<Text as="span" fontSize="$lg" color={darkMode() ? '$primary5' : colors.primary1} lineHeight="24px">
						{getTitle(
							props.forceRole?.() ?? props.company.title.role,
							props.forceNonSenior?.() ? !props.forceNonSenior() : props.company.title.senior
						)}
					</Text>
				)}{' '}
				– {renderCompany(props.company.name, props.company.website)}
			</Box>
			<Show when={props.company.from && props.company.to}>
				<Text fontSize="$xs" fontWeight="$bold">
					{props.company.from} - {props.company.to}
				</Text>
			</Show>
			<Show when={props.company.description}>
				<Text mt="$4">{renderStringOrJsx(props.company.description)}</Text>
			</Show>

			<Text fontWeight="$bold" color={darkMode() ? '$primary5' : colors.primary1} my="$4">
				Projects:
			</Text>
			<List d="flex" flexDirection="column" mt="$2">
				<For each={projects()}>
					{(project, index) => (
						<ListItem>
							<ProjectSummary project={project} />
							{index() !== projects().length - 1 && <Divider my="$4" />}
						</ListItem>
					)}
				</For>
			</List>
		</Flex>
	);
};
