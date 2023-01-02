import { work } from '../../data/work';
import Fade from '../../ui/components/Fade';
import { CompanyProjects } from './CompanyProjects';
import { Timeline } from './Timeline';

const Resume = () => (
	<Fade>
		<Timeline>
			{work.map((company) => (
				<CompanyProjects company={company} />
			))}
		</Timeline>
	</Fade>
);

export default Resume;
