import { Box, Button, Center, Flex } from '@hope-ui/solid';
import { MetaProvider, Title } from '@solidjs/meta';
import { A } from '@solidjs/router';
import { work } from '../../data/work';
import Fade from '../../ui/components/Fade';
import { CompanyProjects } from './CompanyProjects';
import { Timeline } from './Timeline';

const Experience = () => (
	<Fade in={() => true}>
		<MetaProvider>
			<Title>Ahmed Habeila's Portfolio - Work experience</Title>
		</MetaProvider>
		<Box
			pt={{
				'@initial': '100px',
				'@md': '$28',
				'@lg': '$48',
			}}
			px={{ '@xl': '$48' }}
			data-id="index-box-1-7c9065"
		>
			<Timeline
				showStepper
				children={work.map((company) => (
					<CompanyProjects company={company} />
				))}
			/>
		</Box>

		<Center mt="$24" mb="$8" data-id="index-center-1-7a3578">
			<Flex gap="$4" flexWrap="wrap" justifyContent="center" data-id="index-flex-1-1e878e">
				<Button as={A} role="link" variant="outline" href="/resume">
					View my resume online
				</Button>
				<Button
					as={A}
					role="link"
					variant="outline"
					href="/assets/AhmedHabeilaResume.pdf"
					download="Ahmed Habeila's resume"
				>
					Download my resume as PDF
				</Button>
			</Flex>
		</Center>
	</Fade>
);

export default Experience;
