import { Box, Button, Center, Flex } from '@hope-ui/solid';
import { MetaProvider, Title } from '@solidjs/meta';
import { A } from '@solidjs/router';
import { work } from '../../data/work';
import Fade from '../../ui/components/Fade';
import { CompanyProjects } from './CompanyProjects';
import { Timeline } from './Timeline';
import { darkMode } from '../../App';

const Resume = () => (
	<Fade in={() => true}>
		<MetaProvider>
			<Title>Ahmed Habeila's Portfolio - Resume</Title>
		</MetaProvider>
		<Box
			pt={{
				'@initial': '100px',
				'@md': '$28',
				'@lg': '$48',
			}}
			px={{ '@xl': '$48' }}
		>
			<Timeline
				showStepper
				children={work.map((company) => (
					<CompanyProjects company={company} />
				))}
			/>
		</Box>

		<Center mt="$24" mb="$8">
			<Flex gap="$4" flexWrap="wrap" justifyContent="center">
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
