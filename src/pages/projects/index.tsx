import { Box } from '@hope-ui/solid';
import { Navigate, useParams } from '@solidjs/router';
import { projects } from '../../data/work';
import Fade from '../../ui/components/Fade';
import Projects from '../home/Projects';
import ProjectLayoutDetailed from './ProjectDetails';
import { Accessor, createEffect, createSignal } from 'solid-js';
import { JSX } from 'solid-js';
import { getAsteriskSectionColor } from '../../ui/theme';
import { BottomSectionDivider, UpperSectionDivider, sectionDividerHeight } from '../home/SectionDivider';

export default function Project() {
	const project = () => projects.find((p) => p.id === useParams().id);

	if (!project) return <Navigate href="/" />;

	const [projectNode, setProjectNode] = createSignal<JSX.Element | null>(null);

	createEffect(() => {
		console.log('project()', project());
		setProjectNode(<ProjectLayoutDetailed project={project()!} />);
	});

	return (
		<Fade in={() => true}>
			{projectNode}
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
	);
}
