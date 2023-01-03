import { Navigate, useParams } from '@solidjs/router';
import { projects } from '../../data/work';
import ProjectLayoutDetailed from './ProjectDetails';
import Fade from '../../ui/components/Fade';

export default function Project() {
	const params = useParams();
	const project = projects.find((p) => p.id === params.id);

	if (!project) return <Navigate href="/" />;

	return (
		<Fade>
			<ProjectLayoutDetailed project={project} />
		</Fade>
	);
}
