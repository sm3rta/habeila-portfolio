import { work } from '../../data/work';
import { CompanyProjects } from './CompanyProjects';
import { Timeline } from './Timeline';

const Resume = () => (
	<Timeline>
		{work.map((company) => (
			<CompanyProjects company={company} />
		))}
	</Timeline>
);

export default Resume;
