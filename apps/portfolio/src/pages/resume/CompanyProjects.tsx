import { Anchor, Box, Flex, List } from '@hope-ui/solid';
import { For, Match, Show, Switch } from 'solid-js';
import { Workplace } from '../../data/work';
import { Text } from '../../ui/components/Text';
import { getTitle } from '../../utils/getTitle';
import ProjectSummary from './ProjectSummary';

const renderCompany = (props: Workplace) => {
	const company = (
		<Text as="span" data-id="CompanyProjects-text-1-4d244c">
			{props.name}
		</Text>
	);

	return (
		<>
			<Switch>
				<Match when={props.website}>
					<Anchor href={props.website}>{company}</Anchor>
				</Match>
				<Match when={!props.website}>{company}</Match>
			</Switch>
			<Show when={props.location}>
				<Text as="span" data-id="CompanyProjects-text-2-9ff92a">
					, {props.location}
				</Text>
			</Show>
		</>
	);
};

export const CompanyProjects = (props: {
	company: Workplace;
	forceRole?: 'full' | 'se' | undefined;
	forceNonSenior?: boolean | undefined;
}) => (
	<Flex h="$full" w="$full" direction="column" justifyContent="center" data-id="CompanyProjects-flex-1-fc46f2">
		<Box d="flex" justifyContent="space-between" data-id="CompanyProjects-box-1-773179">
			<Box d="inline" data-id="CompanyProjects-box-2-f6f768">
				{props.company.title && (
					<Text variant="subtitle" as="span" data-id="CompanyProjects-text-3-7d3d13">
						{getTitle(
							props.forceRole ?? props.company.title.role,
							props.forceNonSenior !== undefined ? !props.forceNonSenior : props.company.title.senior
						)}
					</Text>
				)}
				<Show when={props.company.name === 'Self-employed'}>
					<Text as="span" data-id="CompanyProjects-text-4-3cac25">
						{' '}
						(Self-employed)
					</Text>
				</Show>
				<Show when={props.company.name !== 'Self-employed'}>
					<>
						<Text as="span" data-id="CompanyProjects-text-5-1defaa">
							{' '}
							at{' '}
						</Text>
						{renderCompany(props.company)}
					</>
				</Show>
			</Box>

			<Show when={props.company.from && props.company.to}>
				<Text data-id="CompanyProjects-text-6-a73353">
					{props.company.from} - {props.company.to}
				</Text>
			</Show>
		</Box>

		<List d="flex" flexDirection="column" gap="$4" mt="$2" data-id="CompanyProjects-list-1-9a80c2">
			<For each={props.company.projects}>{(project) => <ProjectSummary project={project} />}</For>
		</List>
	</Flex>
);
