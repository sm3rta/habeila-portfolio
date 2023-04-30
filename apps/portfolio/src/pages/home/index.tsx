import { Box } from '@hope-ui/solid';
import Fade from '../../ui/components/Fade';
import { getAsteriskSectionColor } from '../../ui/theme';
import About from './About';
import Contact from './Contact';
import Intro from './Intro';
import Projects from './Projects';

const Home = () => {
	return (
		<Fade in={() => true}>
			<Box
				css={{
					'& > section:nth-child(even)': { background: getAsteriskSectionColor() },
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
