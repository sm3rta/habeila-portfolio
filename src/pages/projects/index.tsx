import { Box } from '@hope-ui/solid';
import { Navigate, useParams } from '@solidjs/router';
import { projects } from '../../data/work';
import Fade from '../../ui/components/Fade';
import Projects from '../home/Projects';
import ProjectLayoutDetailed from './ProjectDetails';
import { Accessor, createEffect, createSignal } from 'solid-js';
import { JSX } from 'solid-js';

export default function Project() {
	const project = () => projects.find((p) => p.id === useParams().id);

	if (!project) return <Navigate href="/" />;

	const [projectNode, setProjectNode] = createSignal<JSX.Element | null>(null);

	createEffect(() => {
		console.log('project()', project());
		setProjectNode(<ProjectLayoutDetailed project={project()!} />);
	});

	return (
		<Fade>
			{projectNode}
			<Box background="rgb(0 0 0 / 40%)" mt="$16">
				<Projects />
			</Box>
		</Fade>
	);
}
