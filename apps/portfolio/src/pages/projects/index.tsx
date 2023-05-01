import { Box } from '@hope-ui/solid';
import { MetaProvider, Title } from '@solidjs/meta';
import { Navigate, useParams } from '@solidjs/router';
import { Match, Show, Switch, createEffect, createSignal } from 'solid-js';
import { Project as ProjectType, allProjects } from '../../data/work';
import Fade from '../../ui/components/Fade';
import { getAsteriskSectionColor } from '../../ui/theme';
import Projects from '../home/Projects';
import { BottomSectionDivider, UpperSectionDivider, sectionDividerHeight } from '../home/SectionDivider';
import ProjectLayoutDetailed from './ProjectDetails';

export default function Project() {
	const [project, setProject] = createSignal<ProjectType | undefined>(undefined);

	createEffect(() => {
		setProject(allProjects.find((p) => p.id === useParams().id));
	});

	return (
		<>
			<MetaProvider>
				<Title>Ahmed Habeila's Portfolio - {project()?.name ?? 'Project'}</Title>
			</MetaProvider>
			<Switch>
				<Match when={!project}>
					<Navigate href="/" />
				</Match>
				<Match when={project}>
					<Fade in={() => true}>
						<Show when={project()}>
							<ProjectLayoutDetailed project={project()!} />
						</Show>
						<Box pos="relative" mt="$16" height={sectionDividerHeight}>
							<BottomSectionDivider />
						</Box>
						<Box background={getAsteriskSectionColor()}>
							<Projects />
						</Box>
						<Box pos="relative">
							<UpperSectionDivider />
						</Box>
					</Fade>
				</Match>
			</Switch>
		</>
	);
}
