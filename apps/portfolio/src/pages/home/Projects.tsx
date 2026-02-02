import { Box, Button, Flex, Heading, Text, useTheme } from '@hope-ui/solid';
import { A } from '@solidjs/router';
import { For, createSignal } from 'solid-js';
import { allProjects, projectPriority } from '../../data/work';
import { TILE_SIZE, createOctagonalClipPathWithMargin, zIndexes } from '../../ui/theme';
import Section from './Section';
import { applyAlphaToHex } from '../../utils';
import { darkMode } from '../../App';

const projects = allProjects
	.filter((project) => !project.hideOnHomepage)
	.sort((a, b) => projectPriority[a.id] - projectPriority[b.id]);

const ProjectTile = (props: { project: (typeof projects)[0] }) => {
	const [hover, setHover] = createSignal(false);
	const backgroundColor = darkMode() ? '$primary6' : '$primary3';
	const colors = useTheme()().colors;
	const boxShadowColor = applyAlphaToHex(darkMode() ? colors.accent5.value : colors.accent8.value, 0.2);

	return (
		<Box
			position="relative"
			w={TILE_SIZE}
			h={TILE_SIZE}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			overflow="hidden"
			transition="all 0.3s ease-in-out"
			css={{
				filter: `drop-shadow(0 0 ${hover() ? '15px' : '10px'} ${boxShadowColor})`,
			}}
			role="listitem"
		>
			<Flex
				position="relative"
				w={TILE_SIZE}
				h={TILE_SIZE}
				placeContent="center"
				alignItems="center"
				textAlign="center"
				zIndex={zIndexes.rhombus}
				backgroundColor={backgroundColor}
				opacity={hover() ? 0 : 1}
				css={{
					transition: 'all 0.3s ease-in-out',
					clipPath: createOctagonalClipPathWithMargin(5),
				}}
				p="$3"
				data-id="Projects-flex-1-c57c3b"
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
					filter: hover() ? 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))' : 'none',
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
				role="link"
				href={`/projects/${props.project.id}`}
				textAlign="center"
				color="white"
				aria-label={`See details for project ${props.project.name}`}
			>
				See project details
			</Button>
		</Box>
	);
};

const Projects = () => (
	<Section id="work" alignItems="center" role="group" aria-label="Projects section" tabIndex={-1}>
		<Heading level="2" fontSize="$3xl">
			Projects
		</Heading>
		<Flex
			aria-label="List of projects"
			role="list"
			wrap="wrap"
			gap="$6"
			placeContent="center"
			mt={{ '@initial': '$8', '@lg': '$16' }}
		>
			<For each={projects}>{(project) => <ProjectTile project={project} />}</For>
		</Flex>
	</Section>
);

export default Projects;
