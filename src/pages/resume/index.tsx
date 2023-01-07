import { Anchor, Button, Center } from '@hope-ui/solid';
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

		<Center mt="$24">
			<Button as={Anchor} variant="outline" href="/assets/Ahmed Habeila's CV.pdf" download="Ahmed Habeila's resume">
				Download resume as PDF
			</Button>
		</Center>
	</Fade>
);

export default Resume;
