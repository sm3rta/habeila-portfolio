import { Box, Button, Flex, Heading, Text } from '@hope-ui/solid';
import { A } from '@solidjs/router';
import { For, createSignal } from 'solid-js';
import { darkMode } from '../../App';
import { allProjects, projectPriority } from '../../data/work';
import { TILE_SIZE, colors, createOctagonalClipPathWithMargin, zIndexes } from '../../ui/theme';
import Section from './Section';

const projects = allProjects
	.filter((project) => !project.hideOnHomepage)
	.sort((a, b) => projectPriority[a.id] - projectPriority[b.id]);

const ProjectTile = (props: { project: (typeof projects)[0] }) => {
	const [hover, setHover] = createSignal(false);
	// const backgroundColor = generateRandomColor(0.3);
	// const boxShadowColor = backgroundColor.replace('0.1', '0.8');
	const backgroundColor = darkMode() ? colors.primary1 : colors.primary8;
	const boxShadowColor = backgroundColor;

	return (
		<Box
			position="relative"
			w={TILE_SIZE}
			h={TILE_SIZE}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			overflow="hidden"
			boxShadow={hover() ? `0 0 24px -16px ${boxShadowColor}` : `0 0 0px 0px ${boxShadowColor}`}
			transition="all 0.3s ease-in-out"
		>
			<Flex
				position="relative"
				w={TILE_SIZE}
				h={TILE_SIZE}
				placeContent="center"
				alignItems="center"
				textAlign="center"
				zIndex={zIndexes.star}
				backgroundColor={backgroundColor}
				opacity={hover() ? 0 : 1}
				css={{
					transition: 'all 0.3s ease-in-out',
					clipPath: createOctagonalClipPathWithMargin(5),
				}}
				p="$3"
			>
				{props.project.Logo ? (
					<props.project.Logo height="100%" />
				) : (
					<Text fontWeight="bold">{props.project.name}</Text>
				)}
			</Flex>
			<Button
				w={TILE_SIZE}
				h={TILE_SIZE}
				css={{
					transition: 'all 0.3s ease-in-out',
					whiteSpace: 'normal',
					clipPath: createOctagonalClipPathWithMargin(5),
				}}
				onClick={() => setTimeout(() => window.scrollTo(0, 0), 0)}
				onFocus={() => setHover(true)}
				onBlur={() => setHover(false)}
				opacity={hover() ? 1 : 0}
				position="absolute"
				top={0}
				left={0}
				backgroundColor="rgba(0, 0, 0, 0.8) !important"
				as={A}
				href={`/projects/${props.project.id}`}
				textAlign="center"
			>
				See project details
			</Button>
		</Box>
	);
};

const Projects = () => (
	<Section id="work" alignItems="center">
		<Heading level="2" fontSize="$3xl">
			Projects
		</Heading>
		<Flex wrap="wrap" gap="$6" placeContent="center" mt={{ '@initial': '$8', '@lg': '$16' }}>
			<For each={projects}>{(project) => <ProjectTile project={project} />}</For>
		</Flex>
	</Section>
);

export default Projects;
