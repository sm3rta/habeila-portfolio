import { Box, Flex, IconButton, Image, Text } from '@hope-ui/solid';
import { FaSolidChevronLeft, FaSolidChevronRight } from 'solid-icons/fa';
import { For, Match, Show, Suspense, Switch, createSignal, onCleanup } from 'solid-js';
import { styled } from 'solid-styled-components';
import { Project as ProjectType } from '../../data/work';
import { colors } from '../../ui/theme';
import { hexColorWithAlpha } from '../../ui/utils/hexColorWithAlpha';
import { useLoopingSquareProgressBar } from './useLoopingSquareProgressBar';

const transitionDurationMs = 300;

const StyledVideo = styled('video')({
	filter: `drop-shadow(0px 0px 10px ${colors.secondary2})`,
	width: '100%',
});

const Carousel = ({ tasks }: { tasks: NonNullable<ProjectType['tasks']> }) => {
	const [tab, setTab] = createSignal(0);

	const [transitioning, setTransitioning] = createSignal(false);

	const prevPage = () => {
		setTransitioning(true);
		setTimeout(() => {
			setTab(tab() === 0 ? tasks.length - 1 : tab() - 1);
			setTransitioning(false);
			resetProgress();
		}, transitionDurationMs);
	};
	const nextPage = () => {
		// clearTimeout(timer());
		setTransitioning(true);
		setTimeout(() => {
			setTab(tab() === tasks.length - 1 ? 0 : tab() + 1);
			setTransitioning(false);
			resetProgress();
		}, transitionDurationMs);
	};

	const { progressBar, setPaused, resetProgress } = useLoopingSquareProgressBar(nextPage);

	return (
		<Box mt="$8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
			<Flex justifyContent="space-between">
				<Text>Responsibilities</Text>
				<Flex gap="$2">
					<IconButton
						icon={<FaSolidChevronLeft />}
						aria-label="Previous"
						onClick={prevPage}
						disabled={transitioning()}
					/>
					<Box position="relative" w={40}>
						<IconButton
							icon={<FaSolidChevronRight />}
							aria-label="Next"
							onClick={nextPage}
							disabled={transitioning()}
							pos="absolute"
						/>
						{progressBar}
					</Box>
				</Flex>
			</Flex>
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
											'@lg': { gridTemplateColumns: task.imageUrl || task.videoUrl ? '1fr 1fr' : 'unset' },
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
