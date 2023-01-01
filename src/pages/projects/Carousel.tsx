import { Box, Badge, List, ListItem, MenuItem, Text, Anchor, Image, IconButton, Container } from '@hope-ui/solid';
import { Project as ProjectType, ProjectWithCompany, projects } from '../../data/work';
import { Show, For, ComponentProps } from 'solid-js';
import { Navigate, useParams } from '@solidjs/router';
import { styled } from 'solid-styled-components';
import { colors } from '../../ui/theme';
import { hexColorWithAlpha } from '../../ui/utils/hexColorWithAlpha';
import { createSignal, Suspense, Switch, Match, useTransition } from 'solid-js';
import { render } from 'solid-js/web';
import {
	BiRegularChevronsLeft,
	BiSolidChevronLeft,
	BiSolidChevronLeftCircle,
	BiSolidChevronRight,
} from 'solid-icons/bi';
import { FaSolidChevronLeft, FaSolidChevronRight } from 'solid-icons/fa';
import { HiOutlineChevronLeft, HiSolidChevronLeft } from 'solid-icons/hi';

const transitionDurationMs = 300;

const StyledVideo = styled('video')({
	filter: `drop-shadow(0px 0px 10px ${colors.secondary2})`,
	width: '100%',
});

const Carousel = ({ tasks }: { tasks: NonNullable<ProjectType['tasks']> }) => {
	const [tab, setTab] = createSignal(0);
	const [pending, start] = useTransition();
	console.log(`🚀 ~ Carousel ~ pending`, pending());
	const updateTab = (index: number) => () => start(() => setTab(index));
	// const prevPage = () => start(() => setTab(tab() === 0 ? tasks.length - 1 : tab() - 1));
	// const nextPage = () => start(() => setTab(tab() === tasks.length - 1 ? 0 : tab() + 1));

	const [transitioning, setTransitioning] = createSignal(false);
	const prevPage = () => {
		setTransitioning(true);

		setTimeout(() => {
			setTab(tab() === 0 ? tasks.length - 1 : tab() - 1);
			setTransitioning(false);
		}, transitionDurationMs);
	};
	const nextPage = () => {
		setTransitioning(true);

		setTimeout(() => {
			setTab(tab() === tasks.length - 1 ? 0 : tab() + 1);
			setTransitioning(false);
		}, transitionDurationMs);
	};

	return (
		<Box>
			<Box d="flex" justifyContent="space-between">
				<Text mt="$3">tasks</Text>
				<Box>
					<IconButton icon={<FaSolidChevronLeft />} aria-label="Previous" onClick={prevPage} />
					<IconButton icon={<FaSolidChevronRight />} aria-label="Next" onClick={nextPage} />
				</Box>
			</Box>
			<Box
				mt="$2"
				d="flex"
				gap="$2"
				flexWrap="wrap"
				css={{
					transition: `all ${transitionDurationMs}ms ease-in-out`,
					opacity: transitioning() ? 0 : 1,
				}}
			>
				<Suspense fallback={<div>Loading...</div>}>
					<Switch>
						<For each={tasks}>
							{(task, index) => (
								<Match when={tab() === index()}>
									<Box
										d="grid"
										w="100%"
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
								</Match>
							)}
						</For>
					</Switch>
				</Suspense>
			</Box>
		</Box>
	);
};

export default Carousel;
