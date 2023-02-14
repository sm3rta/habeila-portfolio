import { Box } from '@hope-ui/solid';
import Fade from '../../ui/components/Fade';
import About from './About';
import Contact from './Contact';
import Intro from './Intro';
import Projects from './Projects';
import { getAsteriskSectionColor } from '../../ui/theme';

const Home = () => {
	return (
		<Fade>
			<Box
				css={{
					'& > div:nth-child(even)': { background: getAsteriskSectionColor() },
				}}
			>
				<Intro />
				<Projects />
				<About />
				<Contact />
			</Box>
		</Fade>
	);
};

export default Home;
