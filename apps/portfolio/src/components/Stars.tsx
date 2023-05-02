import { Box } from '@hope-ui/solid';
import { For, Show, createSignal, onMount } from 'solid-js';
import { Star } from '../ui/components/Star';
import { randRangeInt } from '../utils';

export const Stars = () => {
	const [show, setShow] = createSignal(false);

	onMount(() => {
		setTimeout(() => {
			setShow(true);
		}, 3000);
	});

	return (
		<Show when={show()}>
			<Box pos="absolute" h="100%" w="100%" pointerEvents="none">
				<Box pos="relative" h="100%" w="100%" pointerEvents="none">
					<For each={[...Array(randRangeInt(40, 60))]}>{() => <Star />}</For>
				</Box>
			</Box>
		</Show>
	);
};
