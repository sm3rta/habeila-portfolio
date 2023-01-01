import { work } from '../../data/work';
import { CompanyProjects } from './CompanyProjects';
import { Timeline } from './Timeline';

export const Resume = () => {
	return (
		<Timeline>
			{work.map((company) => (
				<CompanyProjects company={company} />
			))}
		</Timeline>
	);
};
