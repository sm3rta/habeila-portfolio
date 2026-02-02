import { Box, Flex, IconButton, Image, Text, useTheme } from '@hope-ui/solid';
import { FaSolidChevronLeft, FaSolidChevronRight } from 'solid-icons/fa';
import { For, Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { Project as ProjectType } from '../../data/work';
import { renderStringOrJsx } from '../../utils/renderStringOrJsx';
import { useLoopingSquareProgressBar } from './useLoopingSquareProgressBar';

const transitionDurationMs = 150;

const imageVideoShadowColor = 'accent10';

const StyledVideo = styled('video')(() => {
	const { colors, radii } = useTheme()();
	return {
		filter: `drop-shadow(0px 0px 15px ${colors[imageVideoShadowColor].value})`,
		marginLeft: 'auto',
		borderRadius: radii.md.value,
	};
});

const Carousel = (props: { projectId: string; achievements: NonNullable<ProjectType['achievements']> }) => {
	const [tab, setTab] = createSignal(0);
	const [transitioning, setTransitioning] = createSignal(false);
	const [height, setHeight] = createSignal(0);

	const colors = useTheme()().colors;

	const updateHeight = () => {
		const carousel = document.querySelector('#carousel');
		if (!carousel) return;
		const carouselChildren = [...carousel.children];
		// get max height of all children
		const maxHeight = carouselChildren.reduce((acc, child) => {
			const childHeight = child.getBoundingClientRect().height;
			return childHeight > acc ? childHeight : acc;
		}, 0);
		setHeight(maxHeight);
	};

	onMount(() => {
		window.addEventListener('resize', updateHeight);
		setTimeout(() => {
			updateHeight();
		}, 0);
	});

	onCleanup(() => {
		window.removeEventListener('resize', updateHeight);
	});

	createEffect(() => {
		if (props.projectId) {
			setTab(0);
			resetProgress();
		}
	});

	const prevPage = () => {
		setTransitioning(true);
		setTimeout(() => {
			setTab(tab() === 0 ? props.achievements.length - 1 : tab() - 1);
			setTransitioning(false);
			resetProgress();
		}, transitionDurationMs);
	};
	const nextPage = () => {
		setTransitioning(true);
		setTimeout(() => {
			setTab(tab() === props.achievements.length - 1 ? 0 : tab() + 1);
			setTransitioning(false);
			resetProgress();
		}, transitionDurationMs);
	};

	const { progressBar, setPaused, resetProgress } = useLoopingSquareProgressBar(() => {
		props.achievements.length > 1 && nextPage();
	});

	return (
		<Box mt="$8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
			<Flex justifyContent="space-between" align-items="center">
				<Text fontWeight="$bold">Achievements</Text>
				<Show when={props.achievements.length > 1}>
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
								border="none"
							/>
							{progressBar}
						</Box>
					</Flex>
				</Show>
			</Flex>
			<Box mt="$2" d="flex" gap="$2" flexWrap="wrap" pos="relative" id="carousel" h={height()}>
				<For each={props.achievements}>
					{(task, index) => (
						<Box
							d="grid"
							w="100%"
							gap="$8"
							gridTemplateColumns={{
								'@initial': 'unset',
								'@lg': 'minmax(300px, 1fr) minmax(auto, 1fr)',
							}}
							transition={`all ${transitionDurationMs}ms ease-in-out`}
							opacity={tab() === index() && !transitioning() && height() ? 1 : 0}
							css={{
								visibility: tab() === index() && !transitioning() && height() ? 'visible' : 'hidden',
							}}
							pos="absolute"
						>
							<Text>{renderStringOrJsx(task.description)}</Text>

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
									mx="auto"
									maxH={600}
									css={{ filter: `drop-shadow(0px 0px 15px ${colors[imageVideoShadowColor].value})` }}
									maxW="100%"
									alt={task.imageAlt}
									borderRadius="$md"
								/>
							</Show>
						</Box>
					)}
				</For>
			</Box>
		</Box>
	);
};

export default Carousel;
