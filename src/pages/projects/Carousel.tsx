import { Box, Flex, IconButton, Image, Text } from '@hope-ui/solid';
import { FaSolidChevronLeft, FaSolidChevronRight } from 'solid-icons/fa';
import { For, Match, Show, Suspense, Switch, createSignal } from 'solid-js';
import { styled } from 'solid-styled-components';
import { Project as ProjectType } from '../../data/work';
import { colors } from '../../ui/theme';
import { useLoopingSquareProgressBar } from './useLoopingSquareProgressBar';

const transitionDurationMs = 300;

const StyledVideo = styled('video')({
	filter: `drop-shadow(0px 0px 15px ${colors.secondary5})`,
	marginLeft: 'auto',
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
		setTransitioning(true);
		setTimeout(() => {
			setTab(tab() === tasks.length - 1 ? 0 : tab() + 1);
			setTransitioning(false);
			resetProgress();
		}, transitionDurationMs);
	};

	const { progressBar, setPaused, resetProgress } = useLoopingSquareProgressBar(
		tasks.length > 1 ? nextPage : undefined
	);

	return (
		<Box mt="$8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
			<Flex justifyContent="space-between" align-items="center">
				<Text fontWeight="$bold">Responsibilities</Text>
				<Show when={tasks.length > 1}>
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
				</Show>
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
										d="flex"
										w="100%"
										gap="$8"
										flexDirection={{ '@initial': 'column', '@lg': 'row' }}
										height="100%"
										css={{ '@lg': { h: '60vh', maxH: '450px' } }}
									>
										<Text>{typeof task.description === 'function' ? task.description() : task.description}</Text>

										{/* video/image container */}
										<Show when={task.videoUrl}>
											<StyledVideo autoplay loop>
												<source src={task.videoUrl} type="video/webm" />
											</StyledVideo>
										</Show>
										<Show when={task.imageUrl}>
											<Image
												src={task.imageUrl}
												zIndex={2}
												pos="relative"
												marginLeft={{ '@initial': 'unset', '@lg': 'auto' }}
												h={{ '@initial': 'auto', '@lg': '60vh' }}
												maxH="450px"
												css={{ filter: `drop-shadow(0px 0px 15px ${colors.secondary6})` }}
											/>
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
