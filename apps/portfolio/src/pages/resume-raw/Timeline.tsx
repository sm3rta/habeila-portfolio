import { Box } from '@hope-ui/solid';
import { For, Show } from 'solid-js';
import { work } from '../../data/work';
import { CompanyProjects } from './CompanyProjects';

const side = 24;

export const Timeline = (props: {
	forceRole?: 'full' | 'se' | undefined;
	forceNonSenior?: boolean;
	showStepper?: boolean;
}) => {
	return (
		<Box d="flex" flexDirection="column" gap="$8">
			<For each={work.filter((company) => company.projects.some((project) => !project.hideOnResume))}>
				{(company) => (
					<Box d="flex" gap="$8">
						<Show when={props.showStepper}>
							<Box d="flex" flexDirection="column" w={side} alignItems="center">
								<Box h={side} w={side} borderRadius="50%" border="4px solid $accent10" />
								<Box flex={1} w="2px" bg="$accent10" />
							</Box>
						</Show>
						<Box d="flex" flexDirection="column" flex={1}>
							<Box>
								<CompanyProjects company={company} />
							</Box>
						</Box>
					</Box>
				)}
			</For>
		</Box>
	);
};
