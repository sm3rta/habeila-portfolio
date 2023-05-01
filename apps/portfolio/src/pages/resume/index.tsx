import { Button, Center, Flex } from '@hope-ui/solid';
import { MetaProvider, Title } from '@solidjs/meta';
import { A } from '@solidjs/router';
import { work } from '../../data/work';
import Fade from '../../ui/components/Fade';
import { CompanyProjects } from './CompanyProjects';
import { Timeline } from './Timeline';

const Resume = () => (
	<Fade in={() => true}>
		<MetaProvider>
			<Title>Ahmed Habeila's Portfolio - Resume</Title>
		</MetaProvider>
		<Timeline
			showStepper
			children={work.map((company) => (
				<CompanyProjects company={company} />
			))}
		/>

		<Center mt="$24">
			<Flex gap="$4">
				<Button as={A} variant="outline" href="/resume-raw">
					Go to raw resume
				</Button>
				<Button as={A} variant="outline" href="/assets/AhmedHabeilaResume.pdf" download="Ahmed Habeila's resume">
					Download resume as PDF
				</Button>
			</Flex>
		</Center>
	</Fade>
);

export default Resume;
