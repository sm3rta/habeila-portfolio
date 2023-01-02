import { Box } from '@hope-ui/solid';
import About from './About';
import Contact from './Contact';
import Intro from './Intro';
import Projects from './Projects';
import Fade from '../../ui/components/Fade';

const Home = () => {
	return (
		<Box
			css={{
				'& > div:nth-child(even)': { background: 'rgb(0 0 0 / 40%)' },
			}}
		>
			<Fade>
				<Intro />
				<Projects />
				<About />
				<Contact />
			</Fade>
		</Box>
	);
};

export default Home;
