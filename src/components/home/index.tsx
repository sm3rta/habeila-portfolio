import { Box } from '@hope-ui/solid';
import About from './About';
import Contact from './Contact';
import Intro from './Intro';

const Home = () => {
	return (
		<Box>
			<Intro />
			<About />
			{/* <Projects/> */}
			<Contact />
		</Box>
	);
};

export default Home;
