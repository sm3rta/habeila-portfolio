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
		<Box d="flex" flexDirection="column" gap="$8" role="list" data-id="Timeline-box-1-c8fbfc">
			<For each={work.filter((company) => company.projects.some((project) => !project.hideOnResume))}>
				{(company) => (
					<Box d="flex" gap="$8" role="listitem" data-id="Timeline-box-2-37974b">
						<Show when={props.showStepper}>
							<Box
								d="flex"
								flexDirection="column"
								w={side}
								alignItems="center"
								role="presentation"
								data-id="Timeline-box-3-8f7d24"
							>
								<Box h={side} w={side} borderRadius="50%" border="4px solid $accent10" />
								<Box flex={1} w="2px" bg="$accent10" />
							</Box>
						</Show>
						<CompanyProjects company={company} />
					</Box>
				)}
			</For>
		</Box>
	);
};
