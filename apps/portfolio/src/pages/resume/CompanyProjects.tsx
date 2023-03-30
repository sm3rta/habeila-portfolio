import { Anchor, Divider, Flex, List, ListItem, Text } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { darkMode } from '../../App';
import { Workplace } from '../../data/work';
import { colors } from '../../ui/theme';
import { getTitle } from '../../utils/getTitle';
import ProjectSummary from './ProjectSummary';

const renderCompany = (name: string, link?: string) => {
	const company = <Text fontSize="$sm">{name}</Text>;
	if (link) return <Anchor href={link}>{company}</Anchor>;
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
}) => (
	<Flex h="100%" w="100%" direction="column" justifyContent="center">
		<Flex justifyContent="space-between" alignItems="center">
			{company.title && (
				<Text fontSize="$lg" color={darkMode() ? '$primary5' : colors.primary1} lineHeight="24px">
					{getTitle(forceRole?.() ?? company.title.role, forceNonSenior?.() ? !forceNonSenior() : company.title.senior)}
				</Text>
			)}
			{renderCompany(company.name, company.website)}
		</Flex>
		<Show when={company.from && company.to}>
			<Text fontSize="$xs" fontWeight="$bold">
				{company.from} - {company.to}
			</Text>
		</Show>
		<Show when={company.description}>
			<Text mt="$4">{company.description}</Text>
		</Show>

		<Text fontWeight="$bold" color={darkMode() ? '$primary5' : colors.primary1} my="$4">
			Projects:
		</Text>
		<List d="flex" flexDirection="column">
			<For each={company.projects.filter((project) => project.id !== 'asset-tracking-system')}>
				{(project, index) => (
					<ListItem pl="$4">
						<ProjectSummary project={{ ...project, company }} />
						{index() !== company.projects.filter((project) => project.id !== 'asset-tracking-system').length - 1 && (
							<Divider my="$4" />
						)}
					</ListItem>
				)}
			</For>
		</List>
	</Flex>
);
