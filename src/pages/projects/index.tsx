import { Navigate, useParams } from '@solidjs/router';
import { projects } from '../../data/work';
import ProjectLayoutDetailed from './ProjectDetails';

export default function Project() {
	const params = useParams();
	const project = projects.find((p) => p.id === params.id);

	if (!project) return <Navigate href="/" />;

	return <ProjectLayoutDetailed project={project} />;
}
