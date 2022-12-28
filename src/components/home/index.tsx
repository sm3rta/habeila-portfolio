import { Box } from '@hope-ui/solid';
import About from './About';
import Contact from './Contact';
import Intro from './Intro';
import Projects from './Projects';

const Home = () => {
	return (
		<Box>
			<Intro />
			<Projects />
			<About />
			<Contact />
		</Box>
	);
};

export default Home;
