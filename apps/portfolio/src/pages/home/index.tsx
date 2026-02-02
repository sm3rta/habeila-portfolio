import { Box } from '@hope-ui/solid';
import { MetaProvider, Title } from '@solidjs/meta';
import Fade from '../../ui/components/Fade';
import { getAsteriskSectionColor } from '../../ui/theme';
import About from './About';
import Contact from './Contact';
import Intro from './Intro';
import Projects from './Projects';

const Home = () => {
	return (
		<Fade in={() => true}>
			<MetaProvider>
				<Title>Ahmed Habeila's Portfolio - Homepage</Title>
			</MetaProvider>
			<Box
				css={{
					'& > section:nth-child(even)': { background: getAsteriskSectionColor() },
				}}
			 data-id="index-box-1-e873c1">
				<Intro />
				<Projects />
				<About />
				<Contact />
			</Box>
		</Fade>
	);
};

export default Home;
