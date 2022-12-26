import { Text, Box } from '@hope-ui/solid';
import { Parallax } from 'rallax';
import About from './components/About';
import { projects } from './data/work';
import Project from './components/Project';
import { randRangeInt, randRange, generateRandomColor } from './utils';
import { Star } from './ui/Star';
import { Stars } from './components/Stars';
import { Contact } from './components/Contact';

function App() {
	const pages = projects.length + 2;
	// const pages = 2;

	return (
		<>
			{/* <AppBar position="fixed">
				<Toolbar>1231</Toolbar>
			</AppBar> */}
			<Box as="main" mt={8}>
				{/* <Parallax pages={pages}> */}
				<Stars pages={pages} />
				<Parallax z={0}>
					<About />
				</Parallax>
				{/* {projects.map((project, index) => (
				<Parallax offset={index + 1} key={project.name}>
					<Project project={project} />
				</Parallax>
			))} */}
				<Parallax z={0}>
					<Contact />
				</Parallax>

				<Parallax z={0}>
					<Box
						css={{
							position: 'relative',
							backgroundImage: 'url(mountains3.png)',
							backgroundSize: 'contain',
							backgroundPosition: 'center bottom 40px',
							filter: 'drop-shadow(2px 4px 6px black)',
						}}
					>
						<Box
							css={{
								position: 'absolute',
								bottom: 0,
								backgroundColor: 'black',
								width: '100%',
								height: 40,
								display: 'flex',
								placeContent: 'center',
							}}
						>
							<Text as="p" textAlign="center" alignSelf="center" verticalAlign="middle">
								copy right habeila
							</Text>
						</Box>
					</Box>
				</Parallax>
				{/* </Parallax> */}
			</Box>
		</>
	);
}

export default App;
