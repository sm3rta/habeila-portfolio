import { Anchor, Box, Flex, Heading, Text } from '@hope-ui/solid';
import { For, Match, Show, Switch } from 'solid-js';
import { Workplace } from '../../data/work';
import StyledDivider from '../../ui/components/Divider';
import { getTitle } from '../../utils/getTitle';
import { renderStringOrJsx } from '../../utils/renderStringOrJsx';
import ProjectSummary from './ProjectSummary';

const renderCompany = (name: string, link?: string) => {
	const company = (
		<Text as="span" fontSize="$lg" data-id="CompanyProjects-text-1-2882b7">
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
		<Flex h="100%" w="100%" direction="column" justifyContent="center" data-id="CompanyProjects-flex-1-b74a73">
			<Heading level={2} data-id="CompanyProjects-heading-1-098be1">
				{props.company.title && (
					<Text as="span" fontSize="$lg" lineHeight="24px" data-id="CompanyProjects-text-2-b68650">
						{getTitle(props.company.title.role, props.company.title.senior)}
					</Text>
				)}{' '}
				&ndash; {renderCompany(props.company.name, props.company.website)}
			</Heading>
			<Show when={props.company.from && props.company.to}>
				<Text fontSize="$xs" fontWeight="$bold" data-id="CompanyProjects-text-3-9d71ce">
					{props.company.from} - {props.company.to}
				</Text>
			</Show>
			<Show when={props.company.description}>
				<Text mt="$4" data-id="CompanyProjects-text-4-a2726d">
					{renderStringOrJsx(props.company.description)}
				</Text>
			</Show>

			{/* <Text fontWeight="$bold" my="$4" data-id="CompanyProjects-text-5-31d45e">
				Projects:
			</Text> */}
			<Box
				role="list"
				d="flex"
				flexDirection="column"
				mt="$2"
				data-id="CompanyProjects-list-1-3a70c1"
				aria-label={`Projects at ${props.company.name}`}
			>
				<For each={projects()}>
					{(project, index) => (
						<>
							<ProjectSummary project={project} />
							{index() !== projects().length - 1 && <StyledDivider my="$4" role="presentation" />}
						</>
					)}
				</For>
			</Box>
		</Flex>
	);
};
