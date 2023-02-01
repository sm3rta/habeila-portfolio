import { Box } from '@hope-ui/solid';
import Fade from '../../ui/components/Fade';
import About from './About';
import Contact from './Contact';
import Intro from './Intro';
import Projects from './Projects';
import { darkMode } from '../../App';

const Home = () => (
	<Fade>
		<Box
			css={{
				'& > div:nth-child(even)': { background: darkMode() ? 'rgb(0 0 0 / 40%)' : 'rgb(255 255 255 / 40%)' },
			}}
		>
			<Intro />
			<Projects />
			<About />
			<Contact />
		</Box>
	</Fade>
);

export default Home;
