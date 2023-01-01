import { Box, Badge, List, ListItem, MenuItem, Text, Anchor, Image } from '@hope-ui/solid';
import { Project as ProjectType, ProjectWithCompany, projects } from '../../data/work';
import { Show, For, ComponentProps } from 'solid-js';
import { Navigate, useParams } from '@solidjs/router';
import { styled } from 'solid-styled-components';
import { colors } from '../../ui/theme';
import { hexColorWithAlpha } from '../../ui/utils/hexColorWithAlpha';

const renderProjectTitle = (name: string, link?: string) => {
	const company = <Text as="span">{name}</Text>;
	if (link) return <Anchor href={link}>{company}</Anchor>;
	else return company;
};

export const ProjectLayout = ({ project }: { project: ProjectWithCompany }) => {
	return (
		<Box w="100%" d="flex" flexDirection="column" justifyContent="center">
			<Box>
				{renderProjectTitle(project.name, project.website)}
				<Text as="span" fontSize="$sm">
					: {project.description}
				</Text>
			</Box>
			<Box pl="$2">
				<Show when={project.technologies?.length}>
					<Text mt="$3">Technologies used</Text>
					<Box mt="$2" d="flex" gap="$2" flexWrap="wrap">
						<For each={project.technologies}>{(tech) => <Badge>{tech}</Badge>}</For>
					</Box>
				</Show>

				<Show when={project.responsibilities?.length}>
					<Text mt="$3">My responsibilities</Text>
					<Box mt="$2" d="flex" gap="$2" flexWrap="wrap">
						<For each={project.responsibilities}>{(resp) => <Badge>{resp}</Badge>}</For>
					</Box>
				</Show>
			</Box>
		</Box>
	);
};

const StyledVideo = styled('video')({
	filter: `drop-shadow(0px 0px 10px ${colors.secondary2})`,
	width: '100%',
});

const Carousel = ({ tasks }: { tasks: ProjectType['tasks'] }) => {
	return (
		<Box mt="$2" d="flex" gap="$2" flexWrap="wrap">
			<For each={tasks}>
				{(task) => (
					<Box
						d="grid"
						w="100%"
						px="$8"
						gap="$8"
						css={{
							'@lg': { gridTemplateColumns: '1fr 1fr' },
						}}
					>
						<Text>{task.description}</Text>

						<Show when={task.imageUrl || task.videoUrl}>
							{/* grid box */}
							<Box>
								{/* video container */}
								<Box pos="relative">
									<Show when={task.videoUrl}>
										<StyledVideo autoplay loop>
											<source src={task.videoUrl} type="video/webm" />
										</StyledVideo>
									</Show>
									<Show when={task.imageUrl}>
										<Image src={task.imageUrl} />
									</Show>
									{/* shadow */}
									<Box
										css={{
											pointerEvents: 'none',
											position: 'absolute',
											width: '100%',
											height: '100%',
											boxShadow: `${hexColorWithAlpha(colors.secondary1, 0.6)} 0px 0px 20px 0px inset`,
											top: 0,
											left: 0,
										}}
									/>
								</Box>
							</Box>
						</Show>
					</Box>
				)}
			</For>
		</Box>
	);
};

export const ProjectLayoutDetailed = ({ project }: { project: ProjectWithCompany }) => {
	return (
		<Box w="100%" d="flex" flexDirection="column" justifyContent="center">
			<Box>
				{renderProjectTitle(project.name, project.website)}
				<Text as="span" fontSize="$sm">
					: {project.description}
				</Text>
			</Box>
			<Box pl="$2">
				<Show when={project.technologies?.length}>
					<Text mt="$3">Technologies used</Text>
					<Box mt="$2" d="flex" gap="$2" flexWrap="wrap">
						<For each={project.technologies}>{(tech) => <Badge>{tech}</Badge>}</For>
					</Box>
				</Show>

				<Show when={project.responsibilities?.length}>
					<Text mt="$3">My responsibilities</Text>
					<Box mt="$2" d="flex" gap="$2" flexWrap="wrap">
						<For each={project.responsibilities}>{(resp) => <Badge>{resp}</Badge>}</For>
					</Box>
				</Show>

				<Show when={project.tasks?.length}>
					<Text mt="$3">tasks</Text>
					<Carousel tasks={project.tasks} />
				</Show>
			</Box>
		</Box>
	);
};

export default function Project() {
	const params = useParams();
	const project = projects.find((p) => p.id === params.id);

	if (!project) return <Navigate href="/" />;

	return <ProjectLayoutDetailed project={project} />;
}
