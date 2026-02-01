import { Anchor, Divider, Flex, Heading, List, ListItem, Text } from '@hope-ui/solid';
import { For, Match, Show, Switch } from 'solid-js';
import { Workplace } from '../../data/work';
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

export const CompanyProjects = (props: { company: Workplace }) => {
	const projects = () => props.company.projects.filter((project) => !project.hideOnHomepage);
	return (
		<Flex h="100%" w="100%" direction="column" justifyContent="center">
			<Heading level={2}>
				{props.company.title && (
					<Text as="span" fontSize="$lg" lineHeight="24px">
						{getTitle(props.company.title.role, props.company.title.senior)}
					</Text>
				)}{' '}
				&ndash; {renderCompany(props.company.name, props.company.website)}
			</Heading>
			<Show when={props.company.from && props.company.to}>
				<Text fontSize="$xs" fontWeight="$bold">
					{props.company.from} - {props.company.to}
				</Text>
			</Show>
			<Show when={props.company.description}>
				<Text mt="$4">{renderStringOrJsx(props.company.description)}</Text>
			</Show>

			{/* <Text fontWeight="$bold" my="$4">
				Projects:
			</Text> */}
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
