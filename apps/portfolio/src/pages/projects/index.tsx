import { Box } from '@hope-ui/solid';
import { Navigate, useParams } from '@solidjs/router';
import { JSX, Match, Switch, createEffect, createSignal } from 'solid-js';
import { allProjects } from '../../data/work';
import Fade from '../../ui/components/Fade';
import { getAsteriskSectionColor } from '../../ui/theme';
import Projects from '../home/Projects';
import { BottomSectionDivider, UpperSectionDivider, sectionDividerHeight } from '../home/SectionDivider';
import ProjectLayoutDetailed from './ProjectDetails';

export default function Project() {
	const project = () => allProjects.find((p) => p.id === useParams().id);

	const [projectNode, setProjectNode] = createSignal<JSX.Element | null>(null);

	createEffect(() => {
		console.log('project()', project());
		setProjectNode(<ProjectLayoutDetailed project={project()!} />);
	});

	return (
		<Switch>
			<Match when={!project}>
				<Navigate href="/" />
			</Match>
			<Match when={project}>
				<Fade in={() => true}>
					{projectNode()}
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
	);
}
