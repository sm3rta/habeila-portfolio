import { Box } from '@hope-ui/solid';
import { Navigate, useParams } from '@solidjs/router';
import { projects } from '../../data/work';
import Fade from '../../ui/components/Fade';
import Projects from '../home/Projects';
import ProjectLayoutDetailed from './ProjectDetails';

export default function Project() {
	const params = useParams();
	const project = projects.find((p) => p.id === params.id);

	if (!project) return <Navigate href="/" />;

	return (
		<Fade>
			<ProjectLayoutDetailed project={project} />
			<Box background="rgb(0 0 0 / 40%)" mt="$16">
				<Projects />
			</Box>
		</Fade>
	);
}
