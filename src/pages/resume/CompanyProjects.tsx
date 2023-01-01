import { Box, Badge, Text, Anchor, List, ListItem, Divider } from '@hope-ui/solid';
import { ComponentProps, Show, For } from 'solid-js';
import { ProjectWithCompany, Workplace } from '../../data/work';
import ProjectSummary from './ProjectSummary';

const renderCompany = (name: string, link?: string) => {
	const company = <Text fontSize="$sm">{name}</Text>;
	if (link) return <Anchor href={link}>{company}</Anchor>;
	else return company;
};

export const CompanyProjects = ({ company }: { company: Workplace }) => {
	return (
		<Box h="100%" w="100%" d="flex" flexDirection="column" justifyContent="center">
			<Box d="flex" justifyContent="space-between" alignItems="center">
				<Text fontSize="$lg" color="$primary5" lineHeight="24px">
					{company.title}
				</Text>
				{renderCompany(company.name, company.website)}
			</Box>
			<Text fontSize="$xs" fontWeight="$bold">
				{company.from} - {company.to}
			</Text>
			<Show when={company.description}>
				<Text mt="$4">{company.description}</Text>
			</Show>

			<Text fontWeight="$bold" color="$primary5" my="$4">
				Projects:
			</Text>
			<List d="flex" flexDirection="column">
				<For each={company.projects}>
					{(project, index) => (
						<ListItem pl="$4">
							<ProjectSummary project={{ ...project, company }} />
							{index() !== company.projects.length - 1 && <Divider my="$4" />}
						</ListItem>
					)}
				</For>
			</List>
		</Box>
	);
};
