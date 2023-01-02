import { Box } from '@hope-ui/solid';
import About from './About';
import Contact from './Contact';
import Intro from './Intro';
import Projects from './Projects';

const Home = () => (
	<Box
		css={{
			'& > div:nth-child(even)': { background: 'rgb(0 0 0 / 40%)' },
		}}
	>
		<Intro />
		<Projects />
		<About />
		<Contact />
	</Box>
);

export default Home;
