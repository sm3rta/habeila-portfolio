import { Box, Button, Text } from '@hope-ui/solid';
import { A } from '@solidjs/router';
import { For, createSignal } from 'solid-js';
import { projects } from '../../data/work';
import { TILE_SIZE } from '../../ui/theme';
import { generateRandomColor } from '../../utils';
import Section from './Section';

const ProjectTile = ({ project }: { project: typeof projects[0] }) => {
	const [hover, setHover] = createSignal(false);
	const backgroundColor = generateRandomColor(0.1);
	const boxShadowColor = backgroundColor.replace('0.1', '0.8');
	return (
		<Box
			position="relative"
			width={TILE_SIZE}
			height={TILE_SIZE}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			borderRadius="50%"
			overflow="hidden"
			boxShadow={hover() ? `0 0 24px -16px ${boxShadowColor}` : `0 0 0px 0px ${boxShadowColor}`}
			transition="all 0.2s ease-in-out"
		>
			<Box
				width={TILE_SIZE}
				height={TILE_SIZE}
				display="flex"
				placeContent="center"
				alignItems="center"
				textAlign="center"
				zIndex={1}
				backgroundColor={backgroundColor}
				opacity={hover() ? 0 : 1}
				css={{ transition: 'all 0.2s ease-in-out' }}
			>
				<Text fontSize="$md">{project.name}</Text>
			</Box>
			<Button
				width={TILE_SIZE}
				height={TILE_SIZE}
				css={{ transition: 'all 0.2s ease-in-out', whiteSpace: 'normal' }}
				opacity={hover() ? 1 : 0}
				position="absolute"
				top={0}
				left={0}
				zIndex={2}
				backgroundColor="rgba(0, 0, 0, 0.8) !important"
				as={A}
				href={`projects/${project.id}`}
				textAlign="center"
			>
				Learn more about project
			</Button>
		</Box>
	);
};

const Projects = () => (
	<Box background="rgb(0 0 0 / 40%)" id="work">
		<Section flexWrap="wrap" d="flex" gap="$4" justifyContent="center">
			<For each={projects}>{(project) => <ProjectTile project={project} />}</For>
		</Section>
	</Box>
);

export default Projects;
