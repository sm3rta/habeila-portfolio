import { Box } from '@hope-ui/solid';
import { MetaProvider, Title } from '@solidjs/meta';
import { Navigate, useParams } from '@solidjs/router';
import { Match, Show, Switch, createEffect, createSignal } from 'solid-js';
import { Project as ProjectType, allProjects } from '../../data/work';
import Fade from '../../ui/components/Fade';
import { getAsteriskSectionColor } from '../../ui/theme';
import Projects from '../home/Projects';
import { BottomSectionDivider, sectionDividerHeight } from '../home/SectionDivider';
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
						<Box pos="relative" mt="$16" height={sectionDividerHeight} data-id="index-box-1-56c4bf">
							<BottomSectionDivider />
						</Box>
						<Box background={getAsteriskSectionColor()} data-id="index-box-2-b27a77">
							<Projects />
						</Box>
					</Fade>
				</Match>
			</Switch>
		</>
	);
}
