import { Anchor, Box, Divider, Flex, List, ListItem, Text } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { darkMode } from '../../App';
import { Workplace } from '../../data/work';
import { colors } from '../../ui/theme';
import { getTitle } from '../../utils/getTitle';
import ProjectSummary from './ProjectSummary';

const renderCompany = (name: string, link?: string) => {
	const company = (
		<Text as="span" fontSize="$lg">
			{name}
		</Text>
	);
	if (link)
		return (
			<Anchor fontSize="$lg" href={link}>
				{company}
			</Anchor>
		);
	else return company;
};

export const CompanyProjects = ({
	company,
	forceRole,
	forceNonSenior,
}: {
	company: Workplace;
	forceRole?: () => 'full' | 'se' | undefined;
	forceNonSenior?: () => boolean | undefined;
}) => {
	const projects = company.projects.filter((project) => !project.hideOnResume);
	return (
		<Flex h="100%" w="100%" direction="column" justifyContent="center">
			<Box>
				{company.title && (
					<Text as="span" fontSize="$lg" color={darkMode() ? '$primary5' : colors.primary1} lineHeight="24px">
						{getTitle(
							forceRole?.() ?? company.title.role,
							forceNonSenior?.() ? !forceNonSenior() : company.title.senior
						)}
					</Text>
				)}{' '}
				at {renderCompany(company.name, company.website)}
			</Box>
			<Show when={company.from && company.to}>
				<Text fontSize="$xs" fontWeight="$bold">
					{company.from} - {company.to}
				</Text>
			</Show>
			{/* <Show when={company.description}>
                <Text mt="$4">{company.description}</Text>
            </Show> */}

			{/* <Text fontWeight="$bold" color={darkMode() ? '$primary5' : colors.primary1} my="$4">
				Projects:
			</Text> */}
			<List d="flex" flexDirection="column" mt="$4">
				<For each={projects}>
					{(project, index) => (
						<ListItem>
							<ProjectSummary project={project} />
							{index() !== projects.length - 1 && <Divider my="$4" />}
						</ListItem>
					)}
				</For>
			</List>
		</Flex>
	);
};
