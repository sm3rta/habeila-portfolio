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

		<Center mt="$8">
			<Button as={Anchor} variant="outline" href="/ahmed habeila's cv.pdf" download="Ahmed Habeila's resume">
				Download resume as PDF
			</Button>
		</Center>
	</Fade>
);

export default Resume;
